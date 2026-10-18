'use client';

import { usePathname } from 'next/navigation';
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { SITE } from '@/lib/site';
import { Icon } from './Icon';

// The conversation panel is only downloaded when a visitor shows interest.
const loadPanel = () => import('./ChatPanel');
const ChatPanel = lazy(loadPanel);

const AVAILABLE_KEY = 'ls_chat_ok';
const OPEN_KEY = 'ls_chat_open';
const TEASER_KEY = 'ls_chat_teaser_at';
const TEASER_DELAY = 30_000;
const TEASER_QUIET_DAYS = 7;

function session(key: string, value?: string) {
  try {
    if (value === undefined) return window.sessionStorage.getItem(key);
    window.sessionStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
  return null;
}

function teaserRecentlyShown() {
  try {
    return Date.now() - Number(window.localStorage.getItem(TEASER_KEY) || 0) < TEASER_QUIET_DAYS * 864e5;
  } catch {
    return true;
  }
}

/**
 * The chat button. It appears only once the server confirms the assistant is
 * configured, so the site works unchanged before the AI key is installed.
 */
export function ChatLauncher({ lang, t, countries }: { lang: Locale; t: CommonDict['chat']; countries: string[] }) {
  const pathname = usePathname() || '/';
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;
    const enable = () => {
      if (cancelled) return;
      document.documentElement.classList.add('has-chat');
      setReady(true);
      if (session(OPEN_KEY) === '1') {
        setMounted(true);
        setOpen(true);
      }
    };
    const cached = session(AVAILABLE_KEY);
    if (cached === '1') enable();
    if (cached !== null) return;
    const check = () =>
      fetch(SITE.chatEndpoint, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          const ok = d?.available === true;
          session(AVAILABLE_KEY, ok ? '1' : '0');
          if (ok) enable();
        })
        .catch(() => {});
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    idle(check);
    return () => {
      cancelled = true;
    };
  }, []);

  // One gentle prompt after 30 seconds, at most once a week, never over the whitepaper offer.
  useEffect(() => {
    if (!ready || open || teaserRecentlyShown() || /\/(careers|invest)$/.test(pathname)) return;
    const timer = window.setTimeout(() => {
      if (document.querySelector('.lead-nudge')) return;
      setTeaser(true);
      try {
        window.localStorage.setItem(TEASER_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
    }, TEASER_DELAY);
    return () => window.clearTimeout(timer);
  }, [ready, open, pathname]);

  const openChat = useCallback(() => {
    setTeaser(false);
    setMounted(true);
    setOpen(true);
    session(OPEN_KEY, '1');
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    session(OPEN_KEY, '0');
    window.setTimeout(() => buttonRef.current?.focus(), 0);
  }, []);

  if (!ready) return null;
  return (
    <>
      {!open && (
        <button
          ref={buttonRef}
          type="button"
          className="chat-launcher"
          onClick={openChat}
          onPointerEnter={() => void loadPanel()}
          onFocus={() => void loadPanel()}
          aria-label={t.open}
        >
          <Icon name="chat" size={22} />
          <span>{t.launcher}</span>
        </button>
      )}
      {teaser && !open && (
        <div className="chat-teaser">
          <button type="button" className="chat-teaser-text" onClick={openChat}>
            {t.teaser}
          </button>
          <button type="button" className="chat-teaser-close" onClick={() => setTeaser(false)} aria-label={t.dismiss}>
            ×
          </button>
        </div>
      )}
      {mounted && (
        <Suspense fallback={null}>
          <ChatPanel lang={lang} t={t} countries={countries} open={open} onClose={closeChat} />
        </Suspense>
      )}
    </>
  );
}
