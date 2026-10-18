'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { normaliseEmail, readName, suggestEmail, validEmail, validPhone } from '@/lib/contactChecks';
import { rememberLead } from '@/lib/lead';
import { MARKET_NAMES_EN, SITE } from '@/lib/site';
import { Icon } from './Icon';
import { fmt, Rich } from './Rich';

// local: shown in the chat but never sent to the AI (the getting-to-know-you questions, notices).
// hidden: sent to the AI but not shown again (a question asked before the details, already on screen).
type Msg = {
  role: 'user' | 'assistant';
  content: string;
  local?: boolean;
  hidden?: boolean;
  rich?: boolean;
  note?: string;
  error?: boolean;
  edit?: boolean;
};
type Qualification = Record<string, unknown>;
type Contact = { name: string; email: string; company: string; role: string; phone: string; country: string };
// The questions asked before the conversation opens, one at a time.
type Step = 'welcomeBack' | 'name' | 'email' | 'confirmEmail' | 'company' | 'country' | 'done';
type Saved = {
  id: string;
  step: Step;
  name: string;
  suggestion: string; // corrected email offered for a likely typo
  typed: string; // the email as typed, if the visitor keeps it
  pendingQuestion: string; // a question asked before the details, answered once they are in
  contact: Contact | null; // set once a valid email is confirmed
  messages: Msg[];
  qualification: Qualification | null;
  form: 'open' | 'sent' | null;
  demo: boolean;
  reported: number; // messages already emailed to sales; -1 until the first email
  part: number;
};

// The conversation survives page changes within the visit, and is gone when the tab closes.
const STATE_KEY = 'ls_chat_v3';
// Contact details are remembered on this device so returning visitors only need to confirm them.
const CONTACT_KEY = 'ls_chat_contact';
const MAX_INPUT = 1500;
// Requests sent while the page closes must stay small (browsers cap them at 64 KB).
const LEAVE_BUDGET = 15000;

const newId = () => Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => b.toString(16).padStart(2, '0')).join('');
const blank = (): Saved => ({
  id: newId(),
  step: 'name',
  name: '',
  suggestion: '',
  typed: '',
  pendingQuestion: '',
  contact: null,
  messages: [],
  qualification: null,
  form: null,
  demo: false,
  reported: -1,
  part: 0,
});

function load(): Saved | null {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STATE_KEY) || 'null');
    if (saved && Array.isArray(saved.messages)) return { ...blank(), ...saved };
  } catch {
    /* start fresh */
  }
  return null;
}

function persist(state: Saved) {
  try {
    window.sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function savedContact(): Contact | null {
  try {
    const c = JSON.parse(window.localStorage.getItem(CONTACT_KEY) || 'null');
    if (c && typeof c.name === 'string' && validEmail(String(c.email))) {
      return { name: c.name, email: c.email, company: c.company || '', role: c.role || '', phone: c.phone || '', country: c.country || '' };
    }
  } catch {
    /* ignore */
  }
  return null;
}

function keepContact(contact: Contact) {
  try {
    window.localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
  } catch {
    /* ignore */
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
  const [state, setState] = useState<Saved>(blank);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [ready, setReady] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stateRef = useRef(state);
  const pageRef = useRef(pathname);
  const wasOpen = useRef(open);

  const mail = `[${SITE.emails.sales}](mailto:${SITE.emails.sales})`;
  const { step, contact, messages, form } = state;
  const conversation = talk(messages).length;
  const lastEdit = messages.map((m) => Boolean(m.edit)).lastIndexOf(true);
  stateRef.current = state;
  pageRef.current = pathname;

  /** Updates state and saves it at once, so nothing is lost if the page closes straight after. */
  const commit = useCallback((next: Saved) => {
    stateRef.current = next;
    persist(next);
    setState(next);
  }, []);

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let start = load();
    if (!start) {
      start = blank();
      const known = savedContact();
      start.step = known ? 'welcomeBack' : 'name';
      start.messages = [{ role: 'assistant', content: known ? fmt(t.welcomeBack, { name: known.name, email: known.email }) : t.askName, local: true }];
    }
    commit(start);
    setReady(true);
  }, [commit, t]);

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
  }, [open, onClose, ready]);

  const update = (patch: Partial<Saved>) => commit({ ...stateRef.current, ...patch });
  const heard = (content: string) => update({ messages: [...stateRef.current.messages, { role: 'user', content, local: true }] });
  const say = (content: string, patch: Partial<Saved> = {}, extra: Partial<Msg> = {}) =>
    update({ ...patch, messages: [...stateRef.current.messages, { role: 'assistant', content, local: true, ...extra }] });

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

  // ---- Getting to know the visitor ----

  /** Name and email are in: the visitor can now be followed up, so remember them and ask the optional questions. */
  async function confirmEmail(email: string) {
    setPending(true);
    let verdict: { valid?: boolean; deliverable?: boolean } = { valid: true, deliverable: true };
    try {
      const res = await post({ action: 'check_email', email });
      if (res.ok) verdict = await res.json();
    } catch {
      /* the check is a courtesy: if it cannot run, the address is accepted */
    }
    setPending(false);
    if (!verdict.valid) return say(t.errorEmail, { step: 'email' }, { error: true });
    if (!verdict.deliverable) return say(fmt(t.errorDomain, { domain: email.slice(email.lastIndexOf('@') + 1) }), { step: 'email' }, { error: true });
    const s = stateRef.current;
    const details: Contact = { name: s.name, email, company: '', role: '', phone: '', country: '' };
    rememberLead(email);
    keepContact(details);
    say(t.askCompany, { step: 'company', contact: details, suggestion: '', typed: '' });
  }

  function finish(details: Contact) {
    keepContact(details);
    rememberLead(details.email);
    say(fmt(t.greeting, { name: details.name }), { step: 'done', contact: details }, { edit: true });
    const question = stateRef.current.pendingQuestion;
    if (question) {
      update({ pendingQuestion: '' });
      void send(question, true);
    }
  }

  async function answer(text: string) {
    const s = stateRef.current;
    heard(text);
    switch (s.step) {
      case 'welcomeBack': {
        // Typing instead of tapping: carry on with the saved details and treat the text as the first question.
        const known = savedContact();
        if (known) {
          update({ pendingQuestion: text });
          return finish(known);
        }
        return say(t.askName, { step: 'name' });
      }
      case 'name': {
        const kind = readName(text);
        if (kind === 'question') return say(t.askNameFirst, { pendingQuestion: text });
        if (kind === 'greeting') return say(t.askName);
        if (kind === 'invalid') return say(t.errorName, {}, { error: true });
        const name = text.trim().slice(0, 120);
        return say(fmt(t.askEmail, { name }), { step: 'email', name }, { note: t.emailNotice });
      }
      case 'email':
      case 'confirmEmail': {
        const email = normaliseEmail(text);
        if (!validEmail(email)) return say(t.errorEmail, { step: 'email' }, { error: true });
        const suggestion = suggestEmail(email);
        if (suggestion) return say(fmt(t.didYouMean, { email: suggestion }), { step: 'confirmEmail', suggestion, typed: email });
        return confirmEmail(email);
      }
      case 'company':
        return say(t.askCountry, { step: 'country', contact: { ...(s.contact as Contact), company: text.trim().slice(0, 160) } });
      case 'country':
        return finish({ ...(s.contact as Contact), country: text.trim().slice(0, 80) });
    }
  }

  /** A tapped reply: shown in the conversation like a typed one. */
  function choose(label: string, then: () => void) {
    heard(label);
    then();
  }

  // ---- The conversation ----

  /** Asks the AI. `alreadyShown` is for a question the visitor typed before giving their details. */
  async function send(text: string, alreadyShown = false) {
    const question = text.trim().slice(0, MAX_INPUT);
    if (!question || stateRef.current.step !== 'done' || !stateRef.current.contact) return;
    const next: Msg[] = [...stateRef.current.messages, { role: 'user', content: question, hidden: alreadyShown }];
    update({ messages: next });
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
        reply = { role: 'assistant', content: res.status === 429 ? fmt(t.errorRate, { email: mail }) : t.errorBusy, local: true, rich: true, error: true };
      }
    } catch {
      reply = { role: 'assistant', content: t.errorBusy, local: true, rich: true, error: true };
    }
    const s = stateRef.current;
    commit({
      ...s,
      messages: [...s.messages, reply],
      ...(found ? { qualification: found, form: s.form === 'sent' ? 'sent' : 'open' } : {}),
    });
    setPending(false);
  }

  function submit() {
    const text = input.trim();
    if (!text || pending) return;
    setInput('');
    if (inputRef.current) inputRef.current.style.height = '';
    if (stateRef.current.step === 'done') void send(text);
    else void answer(text.slice(0, 200));
  }

  async function requestDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get('phone') || '').trim();
    if (phone && !validPhone(phone)) {
      setFormError(t.errorPhone);
      return;
    }
    setFormError('');
    setBusy(true);
    try {
      const withPhone = { ...(stateRef.current.contact as Contact), phone };
      update({ contact: withPhone });
      keepContact(withPhone);
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
    const s = stateRef.current;
    const greeting: Msg = { role: 'assistant', content: fmt(t.greeting, { name: s.name || s.contact?.name || '' }), local: true, edit: true };
    commit({ ...blank(), step: s.step, name: s.name, contact: s.contact, messages: s.step === 'done' ? [greeting] : s.messages, reported: 0 });
    setFormError('');
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  }

  function grow(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }

  // What the input box expects at each step.
  const field: Record<Step, { placeholder: string; inputMode?: 'email' | 'text'; autoComplete: string }> = {
    welcomeBack: { placeholder: t.placeholder, autoComplete: 'off' },
    name: { placeholder: t.phName, autoComplete: 'name' },
    email: { placeholder: t.phEmail, inputMode: 'email', autoComplete: 'email' },
    confirmEmail: { placeholder: t.phEmail, inputMode: 'email', autoComplete: 'email' },
    company: { placeholder: t.phCompany, autoComplete: 'organization' },
    country: { placeholder: t.phCountry, autoComplete: 'country-name' },
    done: { placeholder: t.placeholder, autoComplete: 'off' },
  };

  let chips: Array<{ label: string; onClick: () => void }> = [];
  if (!pending) {
    if (step === 'welcomeBack') {
      chips = [
        { label: t.continueAs, onClick: () => choose(t.continueAs, () => { const known = savedContact(); if (known) finish(known); else say(t.askName, { step: 'name' }); }) },
        { label: t.useOther, onClick: () => choose(t.useOther, () => say(t.askName, { step: 'name' })) },
      ];
    } else if (step === 'confirmEmail') {
      chips = [
        { label: t.fixYes, onClick: () => choose(t.fixYes, () => void confirmEmail(stateRef.current.suggestion)) },
        { label: t.fixNo, onClick: () => choose(t.fixNo, () => void confirmEmail(stateRef.current.typed)) },
      ];
    } else if (step === 'company') {
      chips = [{ label: t.skip, onClick: () => choose(t.skip, () => say(t.askCountry, { step: 'country' })) }];
    } else if (step === 'country') {
      chips = [
        ...MARKET_NAMES_EN.map((value, i) => ({ label: countries[i], onClick: () => choose(countries[i], () => finish({ ...(stateRef.current.contact as Contact), country: value })) })),
        { label: t.other, onClick: () => choose(t.other, () => finish({ ...(stateRef.current.contact as Contact), country: 'Other' })) },
        { label: t.skip, onClick: () => choose(t.skip, () => finish(stateRef.current.contact as Contact)) },
      ];
    } else if (step === 'done' && conversation === 0) {
      chips = t.starters.map((s) => ({ label: s, onClick: () => void send(s) }));
    }
  }

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
        {conversation > 0 && (
          <button type="button" className="chat-icon-btn" onClick={restart} aria-label={t.restart} title={t.restart}>
            <Icon name="refresh" size={17} />
          </button>
        )}
        <button type="button" className="chat-icon-btn chat-close" onClick={onClose} aria-label={t.close} title={t.close}>
          ×
        </button>
      </header>
      {step === 'done' && form === null && (
        <button type="button" className="chat-demo-bar" onClick={() => update({ form: 'open' })}>
          <span>{t.formTitle}</span>
          <Icon name="arrow" size={16} />
        </button>
      )}

      <div className="chat-log" ref={logRef} aria-live="polite">
        <div className="chat-msg chat-msg--bot">
          <p>{t.welcome}</p>
        </div>
        {ready &&
          messages.map((m, i) => {
            if (m.hidden) return null;
            if (m.role === 'user') {
              return (
                <div key={i} className="chat-msg chat-msg--user">
                  {m.content}
                </div>
              );
            }
            return (
              <div key={i} className={`chat-msg chat-msg--bot${m.error ? ' chat-msg--note' : ''}`}>
                {!m.local ? (
                  <Reply text={m.content} />
                ) : (
                  <p>{m.rich ? <Rich text={m.content} lang={lang} /> : m.content}</p>
                )}
                {m.note && <p className="chat-msg-note">{m.note}</p>}
                {m.edit && step === 'done' && i === lastEdit && (
                  <button type="button" className="chat-link-btn chat-edit" onClick={() => say(t.askName, { step: 'name' })}>
                    {t.editDetails}
                  </button>
                )}
              </div>
            );
          })}
        {pending && (
          <div className="chat-msg chat-msg--bot chat-typing" role="status" aria-label={t.typing}>
            <i />
            <i />
            <i />
          </div>
        )}
        {chips.length > 0 && (
          <div className="chat-starters">
            {chips.map((c) => (
              <button key={c.label} type="button" onClick={c.onClick}>
                {c.label}
              </button>
            ))}
          </div>
        )}

        {contact && step === 'done' && form === 'open' && (
          <form className="chat-form" onSubmit={requestDemo}>
            <div className="chat-form-head">
              <strong>{t.formTitle}</strong>
              <p>{t.formLead}</p>
            </div>
            <div className="chat-confirm">
              <strong>{contact.name}</strong>
              {contact.company && <span>{contact.company}</span>}
              <span>{fmt(t.confirmFor, { email: contact.email })}</span>
            </div>
            <label className="field">
              <span>{t.phone}</span>
              <input name="phone" type="tel" inputMode="tel" maxLength={30} autoComplete="tel" defaultValue={contact.phone} />
            </label>
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

      <form
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          rows={1}
          maxLength={step === 'done' ? MAX_INPUT : 200}
          placeholder={field[step].placeholder}
          aria-label={field[step].placeholder}
          inputMode={field[step].inputMode}
          autoComplete={field[step].autoComplete}
          autoCapitalize={step === 'email' || step === 'confirmEmail' ? 'off' : undefined}
          spellCheck={step === 'done'}
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
