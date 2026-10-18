'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { rememberLead } from '@/lib/lead';
import { MARKET_NAMES_EN, SITE } from '@/lib/site';
import { Icon } from './Icon';
import { fmt, Rich } from './Rich';

type Msg = { role: 'user' | 'assistant'; content: string; local?: boolean };
type Qualification = Record<string, unknown>;
type Contact = { name: string; email: string; company: string; role: string; phone: string; country: string };
type Saved = {
  id: string;
  contact: Contact | null;
  messages: Msg[];
  qualification: Qualification | null;
  form: 'open' | 'sent' | null;
  demo: boolean;
  reported: number; // messages already emailed to sales; -1 until the first email
  part: number;
};

// The conversation survives page changes within the visit, and is gone when the tab closes.
const STATE_KEY = 'ls_chat_v2';
// Contact details are remembered on this device so returning visitors only need to confirm them.
const CONTACT_KEY = 'ls_chat_contact';
const MAX_INPUT = 1500;
// Requests sent while the page closes must stay small (browsers cap them at 64 KB).
const LEAVE_BUDGET = 15000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELDS = ['name', 'email', 'company', 'role', 'phone', 'country'] as const;

const newId = () => Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => b.toString(16).padStart(2, '0')).join('');
const fresh = (): Saved => ({ id: newId(), contact: null, messages: [], qualification: null, form: null, demo: false, reported: -1, part: 0 });

function load(): Saved {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STATE_KEY) || 'null');
    if (saved && Array.isArray(saved.messages)) return { ...fresh(), ...saved };
  } catch {
    /* start fresh */
  }
  return fresh();
}

function persist(state: Saved) {
  try {
    window.sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function savedContact(): Partial<Contact> {
  try {
    return JSON.parse(window.localStorage.getItem(CONTACT_KEY) || '{}');
  } catch {
    return {};
  }
}

const talk = (messages: Msg[]) => messages.filter((m) => !m.local).map(({ role, content }) => ({ role, content }));

// ---- Replies: a small, safe subset of Markdown (paragraphs, lists, bold, site links) ----

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function safeHref(url: string): string | null {
  const local = url.replace(/^https:\/\/(www\.)?logicsonata\.com/i, '') || '/';
  if (/^\/[a-z0-9/_#-]*$/i.test(local)) return local;
  if (/^mailto:[a-z0-9._%+-]+@logicsonata\.com$/i.test(url)) return url;
  return null;
}

function inline(text: string) {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) {
        const href = safeHref(link[2]);
        if (href?.startsWith('/')) {
          return (
            <Link key={i} href={href} className="email-link">
              {link[1]}
            </Link>
          );
        }
        return href ? (
          <a key={i} href={href} className="email-link">
            {link[1]}
          </a>
        ) : (
          <Fragment key={i}>{link[1]}</Fragment>
        );
      }
      return <Fragment key={i}>{part}</Fragment>;
    });
}

function Reply({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (para.length) {
      const lines = para;
      blocks.push(
        <p key={blocks.length}>
          {lines.map((l, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {inline(l)}
            </Fragment>
          ))}
        </p>,
      );
      para = [];
    }
    if (list) {
      const { ordered, items } = list;
      const children = items.map((item, i) => <li key={i}>{inline(item)}</li>);
      blocks.push(ordered ? <ol key={blocks.length}>{children}</ol> : <ul key={blocks.length}>{children}</ul>);
      list = null;
    }
  };
  for (const raw of text.split('\n')) {
    const line = raw.replace(/^#+\s+/, '');
    const item = line.match(/^\s*(?:[-*•]|(\d+)[.)])\s+(.*)$/);
    if (item) {
      if (para.length) flush();
      if (!list) list = { ordered: Boolean(item[1]), items: [] };
      list.items.push(item[2]);
    } else if (line.trim() === '') {
      flush();
    } else {
      if (list) flush();
      para.push(line);
    }
  }
  flush();
  return <>{blocks}</>;
}

// ---- Panel ----

export default function ChatPanel({
  lang,
  t,
  countries,
  open,
  onClose,
}: {
  lang: Locale;
  t: CommonDict['chat'];
  countries: string[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname() || '/';
  const [state, setState] = useState<Saved>(fresh);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [prefill, setPrefill] = useState<Partial<Contact>>({});
  const [ready, setReady] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef(state);
  const pageRef = useRef(pathname);
  const loaded = useRef(false);
  const wasOpen = useRef(open);

  const mail = `[${SITE.emails.sales}](mailto:${SITE.emails.sales})`;
  const { contact, messages, qualification, form } = state;
  stateRef.current = state;
  pageRef.current = pathname;

  useEffect(() => {
    const saved = load();
    stateRef.current = saved;
    setState(saved);
    setPrefill(savedContact());
    setReady(true);
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (loaded.current) persist(state);
  }, [state]);

  useEffect(() => {
    const log = logRef.current;
    // A new visitor starts at the top (welcome and form); a conversation follows its latest message.
    if (log) log.scrollTop = contact || messages.length ? log.scrollHeight : 0;
  }, [messages, pending, form, open, contact, ready]);

  useEffect(() => {
    if (!open) return;
    (stateRef.current.contact ? inputRef.current : nameRef.current)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, ready]);

  /** Updates state and saves it at once, so nothing is lost if the page closes straight after. */
  const commit = useCallback((next: Saved) => {
    stateRef.current = next;
    persist(next);
    setState(next);
  }, []);

  const update = (patch: Partial<Saved>) => commit({ ...stateRef.current, ...patch });

  /** Emails the conversation to sales when there is something new since the last email. */
  const report = useCallback(
    (leaving: boolean) => {
      const s = stateRef.current;
      if (!s.contact) return;
      const lines = talk(s.messages);
      if (s.reported >= 0 && lines.length <= s.reported) return;
      let transcript = lines;
      if (leaving) {
        let size = 0;
        const kept = [];
        for (let i = lines.length - 1; i >= 0 && (size += lines[i].content.length) <= LEAVE_BUDGET; i--) kept.unshift(lines[i]);
        transcript = kept;
      }
      const part = s.part + 1;
      commit({ ...s, reported: lines.length, part });
      fetch(SITE.chatEndpoint, {
        method: 'POST',
        keepalive: leaving,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ action: 'transcript', lang, page: pageRef.current, id: s.id, visitor: s.contact, consent: 'yes', demo: s.demo, part, transcript }),
      }).catch(() => {});
    },
    [commit, lang],
  );

  // The conversation goes to sales when the visitor closes the chat, switches away or leaves the site.
  useEffect(() => {
    if (wasOpen.current && !open) report(false);
    wasOpen.current = open;
  }, [open, report]);

  useEffect(() => {
    const onHidden = () => document.visibilityState === 'hidden' && report(true);
    const onLeave = () => report(true);
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', onLeave);
    return () => {
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', onLeave);
    };
  }, [report]);

  const post = (body: Record<string, unknown>) =>
    fetch(SITE.chatEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ lang, page: pathname, id: stateRef.current.id, visitor: stateRef.current.contact, consent: 'yes', ...body }),
    });

  function start(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('_gotcha')) return;
    const details = Object.fromEntries(FIELDS.map((f) => [f, String(data.get(f) || '').trim()])) as Contact;
    if (!EMAIL.test(details.email)) {
      setFormError(t.errorEmail);
      return;
    }
    setFormError('');
    try {
      window.localStorage.setItem(CONTACT_KEY, JSON.stringify(details));
    } catch {
      /* ignore */
    }
    rememberLead(details.email);
    setPrefill(details);
    update({ contact: details });
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_INPUT);
    if (!question || pending || !stateRef.current.contact) return;
    const next: Msg[] = [...stateRef.current.messages, { role: 'user', content: question }];
    update({ messages: next });
    setInput('');
    if (inputRef.current) inputRef.current.style.height = '';
    setPending(true);
    let reply: Msg;
    let found: Qualification | null = null;
    try {
      const res = await post({ action: 'chat', messages: talk(next).slice(-24) });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        reply = { role: 'assistant', content: data.reply || t.formIntro };
        found = data.form ?? null;
      } else {
        reply = { role: 'assistant', content: res.status === 429 ? fmt(t.errorRate, { email: mail }) : t.errorBusy, local: true };
      }
    } catch {
      reply = { role: 'assistant', content: t.errorBusy, local: true };
    }
    const s = stateRef.current;
    commit({
      ...s,
      messages: [...s.messages, reply],
      ...(found ? { qualification: found, form: s.form === 'sent' ? 'sent' : 'open' } : {}),
    });
    setPending(false);
  }

  async function requestDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormError('');
    setBusy(true);
    try {
      const s = stateRef.current;
      const res = await post({
        action: 'lead',
        _gotcha: data.get('_gotcha') || '',
        preferred_time: data.get('preferred_time') || '',
        qualification: s.qualification ?? {},
        transcript: talk(s.messages),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) throw new Error(result?.error || 'failed');
      // The demo email already carries the conversation so far.
      const now = stateRef.current;
      commit({ ...now, form: 'sent', demo: true, reported: talk(now.messages).length });
    } catch {
      setFormError(fmt(t.errorLead, { email: mail }));
    } finally {
      setBusy(false);
    }
  }

  function restart() {
    report(false);
    commit({ ...fresh(), contact: stateRef.current.contact, reported: 0 });
    setFormError('');
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send(input);
    }
  }

  function grow(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }

  const p = { ...prefill, ...(contact ?? {}) };

  return (
    <div className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" hidden={!open}>
      <header className="chat-head">
        <span className="chat-avatar" aria-hidden="true">
          <Icon name="chat" size={18} />
        </span>
        <div className="chat-head-text">
          <strong id="chat-title">{t.title}</strong>
          <span className="chat-status">{t.status}</span>
        </div>
        {messages.length > 0 && (
          <button type="button" className="chat-icon-btn" onClick={restart} aria-label={t.restart} title={t.restart}>
            <Icon name="refresh" size={17} />
          </button>
        )}
        <button type="button" className="chat-icon-btn chat-close" onClick={onClose} aria-label={t.close} title={t.close}>
          ×
        </button>
      </header>
      {contact && form === null && (
        <button type="button" className="chat-demo-bar" onClick={() => update({ form: 'open' })}>
          <span>{t.formTitle}</span>
          <Icon name="arrow" size={16} />
        </button>
      )}

      <div className="chat-log" ref={logRef} aria-live="polite">
        <div className="chat-msg chat-msg--bot">
          <p>{t.welcome}</p>
        </div>

        {contact && (
          <div className="chat-msg chat-msg--bot">
            <p>{fmt(t.greeting, { name: contact.name })}</p>
            <button
              type="button"
              className="chat-link-btn chat-edit"
              onClick={() => {
                setPrefill(contact);
                update({ contact: null });
              }}
            >
              {t.editDetails}
            </button>
          </div>
        )}
        {contact && messages.length === 0 && (
          <div className="chat-starters">
            {t.starters.map((s) => (
              <button key={s} type="button" onClick={() => void send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="chat-msg chat-msg--user">
              {m.content}
            </div>
          ) : (
            <div key={i} className={`chat-msg chat-msg--bot${m.local ? ' chat-msg--note' : ''}`}>
              {m.local ? (
                <p>
                  <Rich text={m.content} lang={lang} />
                </p>
              ) : (
                <Reply text={m.content} />
              )}
            </div>
          ),
        )}
        {pending && (
          <div className="chat-msg chat-msg--bot chat-typing" role="status" aria-label={t.typing}>
            <i />
            <i />
            <i />
          </div>
        )}

        {/* Rendered once saved details are loaded, so every field, the country included, starts filled in. */}
        {ready && !contact && (
          <form className="chat-form" onSubmit={start}>
            <p className="chat-form-lead">{t.startLead}</p>
            <label className="field">
              <span>{t.name}</span>
              <input ref={nameRef} name="name" required maxLength={120} autoComplete="name" defaultValue={p.name} />
            </label>
            <label className="field">
              <span>{t.email}</span>
              <input name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={p.email} />
            </label>
            <div className="chat-form-row">
              <label className="field">
                <span>{t.company}</span>
                <input name="company" maxLength={160} autoComplete="organization" defaultValue={p.company} />
              </label>
              <label className="field">
                <span>{t.role}</span>
                <input name="role" maxLength={120} autoComplete="organization-title" defaultValue={p.role} />
              </label>
            </div>
            <div className="chat-form-row">
              <label className="field">
                <span>{t.phone}</span>
                <input name="phone" type="tel" maxLength={60} autoComplete="tel" defaultValue={p.phone} />
              </label>
              <label className="field">
                <span>{t.country}</span>
                <select name="country" defaultValue={p.country ?? ''}>
                  <option value="">{t.selectCountry}</option>
                  {MARKET_NAMES_EN.map((value, i) => (
                    <option key={value} value={value}>
                      {countries[i]}
                    </option>
                  ))}
                  <option value="Other">{t.other}</option>
                </select>
              </label>
            </div>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
            <label className="check-field">
              <input type="checkbox" name="consent" value="yes" required />
              <span>{t.consent}</span>
            </label>
            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}
            <button type="submit" className="btn btn-primary btn-sm chat-start">
              {t.start}
              <Icon name="arrow" size={15} />
            </button>
          </form>
        )}

        {contact && form === 'open' && (
          <form className="chat-form" onSubmit={requestDemo}>
            <div className="chat-form-head">
              <strong>{t.formTitle}</strong>
              <p>{t.formLead}</p>
            </div>
            <div className="chat-confirm">
              <strong>{contact.name}</strong>
              {(contact.company || contact.role) && <span>{[contact.role, contact.company].filter(Boolean).join(', ')}</span>}
              <span>{fmt(t.confirmFor, { email: contact.email })}</span>
            </div>
            <label className="field">
              <span>{t.preferredTime}</span>
              <input name="preferred_time" maxLength={200} />
            </label>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
            {formError && (
              <p className="form-error" role="alert">
                <Rich text={formError} lang={lang} />
              </p>
            )}
            <div className="chat-form-actions">
              <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
                {busy ? t.sending : t.submit}
              </button>
              <button type="button" className="chat-link-btn" onClick={() => update({ form: null })}>
                {t.notNow}
              </button>
            </div>
          </form>
        )}
        {form === 'sent' && (
          <div className="chat-sent" role="status">
            <span className="chat-sent-icon">
              <Icon name="check" size={20} />
            </span>
            <div>
              <strong>{t.sentTitle}</strong>
              <p>{t.sentBody}</p>
            </div>
          </div>
        )}
      </div>

      {contact && (
        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            rows={1}
            maxLength={MAX_INPUT}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            onChange={(e) => {
              setInput(e.target.value);
              grow(e.target);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className="chat-send" disabled={pending || !input.trim()} aria-label={t.send} title={t.send}>
            <Icon name="send" size={18} />
          </button>
        </form>
      )}
      <p className="chat-note">{t.disclaimer}</p>
    </div>
  );
}
