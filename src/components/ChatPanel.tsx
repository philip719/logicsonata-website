'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { rememberLead } from '@/lib/lead';
import { SITE } from '@/lib/site';
import { Icon } from './Icon';
import { fmt, Rich } from './Rich';

type Msg = { role: 'user' | 'assistant'; content: string; local?: boolean };
type Qualification = Record<string, unknown>;
type Saved = { messages: Msg[]; qualification: Qualification | null; form: 'open' | 'sent' | null };

// The conversation survives page changes within the visit, and is gone when the tab closes.
const STATE_KEY = 'ls_chat_v1';
const MAX_INPUT = 1500;
const EMPTY: Saved = { messages: [], qualification: null, form: null };

function load(): Saved {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STATE_KEY) || 'null');
    if (saved && Array.isArray(saved.messages)) return { ...EMPTY, ...saved };
  } catch {
    /* start fresh */
  }
  return EMPTY;
}

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

export default function ChatPanel({ lang, t, open, onClose }: { lang: Locale; t: CommonDict['chat']; open: boolean; onClose: () => void }) {
  const pathname = usePathname() || '/';
  const [state, setState] = useState<Saved>(EMPTY);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending'>('idle');
  const [leadError, setLeadError] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const loaded = useRef(false);

  const mail = `[${SITE.emails.sales}](mailto:${SITE.emails.sales})`;
  const { messages, qualification, form } = state;

  useEffect(() => {
    setState(load());
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending, form, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const update = (patch: Partial<Saved>) => setState((s) => ({ ...s, ...patch }));

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_INPUT);
    if (!question || pending) return;
    const next: Msg[] = [...messages, { role: 'user', content: question }];
    update({ messages: next });
    setInput('');
    if (inputRef.current) inputRef.current.style.height = '';
    setPending(true);
    let reply: Msg;
    let found: Qualification | null = null;
    try {
      const res = await fetch(SITE.chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          lang,
          page: pathname,
          messages: next.filter((m) => !m.local).slice(-24).map(({ role, content }) => ({ role, content })),
        }),
      });
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
    setState((s) => ({
      ...s,
      messages: [...s.messages, reply],
      ...(found ? { qualification: found, form: s.form === 'sent' ? 'sent' : 'open' } : {}),
    }));
    setPending(false);
  }

  async function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLeadError(t.errorEmail);
      return;
    }
    setLeadError('');
    setLeadStatus('sending');
    try {
      const res = await fetch(SITE.chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          action: 'lead',
          lang,
          page: pathname,
          _gotcha: data.get('_gotcha') || '',
          contact: {
            name: data.get('name'),
            email,
            company: data.get('company'),
            phone: data.get('phone'),
            consent: data.get('consent') ? 'yes' : '',
          },
          qualification: qualification ?? {},
          transcript: messages.filter((m) => !m.local).map(({ role, content }) => ({ role, content })),
        }),
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.ok) throw new Error(result?.error || 'failed');
      rememberLead(email);
      update({ form: 'sent' });
    } catch {
      setLeadError(fmt(t.errorLead, { email: mail }));
    } finally {
      setLeadStatus('idle');
    }
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

  const company = typeof qualification?.company === 'string' ? qualification.company : '';

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
          <button
            type="button"
            className="chat-icon-btn"
            onClick={() => {
              setState(EMPTY);
              setLeadError('');
            }}
            aria-label={t.restart}
            title={t.restart}
          >
            <Icon name="refresh" size={17} />
          </button>
        )}
        <button type="button" className="chat-icon-btn chat-close" onClick={onClose} aria-label={t.close} title={t.close}>
          ×
        </button>
      </header>
      {form === null && (
        <button type="button" className="chat-demo-bar" onClick={() => update({ form: 'open' })}>
          <span>{t.formTitle}</span>
          <Icon name="arrow" size={16} />
        </button>
      )}

      <div className="chat-log" ref={logRef} aria-live="polite">
        <div className="chat-msg chat-msg--bot">
          <p>{t.welcome}</p>
        </div>
        {messages.length === 0 && (
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

        {form === 'open' && (
          <form className="chat-form" onSubmit={submitLead}>
            <div className="chat-form-head">
              <strong>{t.formTitle}</strong>
              <p>{t.formLead}</p>
            </div>
            <label className="field">
              <span>{t.name}</span>
              <input name="name" required maxLength={120} autoComplete="name" />
            </label>
            <label className="field">
              <span>{t.email}</span>
              <input name="email" type="email" required maxLength={200} autoComplete="email" />
            </label>
            <label className="field">
              <span>{t.company}</span>
              <input name="company" required maxLength={160} autoComplete="organization" defaultValue={company} />
            </label>
            <label className="field">
              <span>{t.phone}</span>
              <input name="phone" type="tel" maxLength={60} autoComplete="tel" />
            </label>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
            <label className="check-field">
              <input type="checkbox" name="consent" value="yes" required />
              <span>{t.consent}</span>
            </label>
            {leadError && (
              <p className="form-error" role="alert">
                <Rich text={leadError} lang={lang} />
              </p>
            )}
            <div className="chat-form-actions">
              <button type="submit" className="btn btn-primary btn-sm" disabled={leadStatus === 'sending'}>
                {leadStatus === 'sending' ? t.sending : t.submit}
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
      <p className="chat-note">{t.disclaimer}</p>
    </div>
  );
}
