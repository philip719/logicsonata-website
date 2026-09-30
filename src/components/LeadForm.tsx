'use client';

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { MARKET_NAMES_EN, SITE } from '@/lib/site';
import { Icon } from './Icon';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Variant = 'whitepaper' | 'investor';

// Visitors who have already shared their details are never asked twice.
const LEAD_KEY = 'ls_lead_v1';

// Submitted values stay in English so every lead reads the same in the inbox.
const INVESTOR_TYPES_EN = ['Venture capital', 'Corporate or strategic', 'Family office', 'Angel investor', 'Other'];

export function hasLead(): boolean {
  try {
    return window.localStorage.getItem(LEAD_KEY) !== null;
  } catch {
    return false;
  }
}

function rememberLead(email: string) {
  try {
    window.localStorage.setItem(LEAD_KEY, JSON.stringify({ email, at: Date.now() }));
  } catch {
    /* storage unavailable: the visitor simply sees the form again next time */
  }
}

function startDownload(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Renders a sentence containing {email} with the address as a mail link. */
export function WithEmail({ text, email }: { text: string; email: string }) {
  const [before, after = ''] = text.split('{email}');
  return (
    <>
      {before}
      <a className="email-link" href={`mailto:${email}`}>
        {email}
      </a>
      {after}
    </>
  );
}

export function LeadForm({
  variant,
  subject,
  asset,
  assetLabel,
  downloadUrl,
  lang,
  t,
  countries,
}: {
  variant: Variant;
  subject: string;
  asset?: string;
  assetLabel?: string;
  downloadUrl?: string;
  lang: Locale;
  t: CommonDict['forms'];
  countries: string[];
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    if (variant === 'whitepaper' && hasLead()) setReturning(true);
  }, [variant]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(SITE.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      rememberLead(String(data.get('email') || ''));
      setStatus('sent');
      if (downloadUrl) startDownload(downloadUrl);
    } catch {
      setStatus('error');
    }
  }

  if (variant === 'whitepaper' && downloadUrl && (status === 'sent' || returning)) {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon">
          <Icon name="check" size={28} />
        </span>
        <h2 className="h3">{status === 'sent' ? t.wpReadyTitle : t.wpBackTitle}</h2>
        <p>
          {status === 'sent' ? t.wpReadyBody : t.wpBackBody}
        </p>
        <a href={downloadUrl} className="btn btn-primary btn-lg" download>
          <Icon name="book" size={18} />
          {t.wpDownload.replace('{title}', assetLabel ?? asset ?? '')}
        </a>
      </div>
    );
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon">
          <Icon name="check" size={28} />
        </span>
        <h2 className="h3">{t.investorThanksTitle}</h2>
        <p>{t.investorThanksBody}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="form" value={variant} />
      {asset && <input type="hidden" name="asset" value={asset} />}
      <input type="hidden" name="language" value={lang} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      <div className="form-row">
        <label className="field">
          <span>{t.fullName}</span>
          <input required name="name" type="text" autoComplete="name" />
        </label>
        <label className="field">
          <span>{variant === 'investor' ? t.email : t.workEmail}</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>{variant === 'investor' ? t.organisation : t.company}</span>
          <input required name="company" type="text" autoComplete="organization" />
        </label>
        {variant === 'investor' ? (
          <label className="field">
            <span>{t.investorType}</span>
            <select required name="investor_type" defaultValue="">
              <option value="" disabled>
                {t.select}
              </option>
              {INVESTOR_TYPES_EN.map((value, i) => (
                <option key={value} value={value}>
                  {t.investorTypes[i]}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label className="field">
            <span>{t.role}</span>
            <input name="role" type="text" autoComplete="organization-title" />
          </label>
        )}
      </div>
      <div className="form-row">
        <label className="field">
          <span>{t.country}</span>
          <select required name="country" defaultValue="">
            <option value="" disabled>
              {t.selectCountry}
            </option>
            {MARKET_NAMES_EN.map((value, i) => (
              <option key={value} value={value}>
                {countries[i]}
              </option>
            ))}
            <option value="Other">{t.other}</option>
          </select>
        </label>
        <label className="field">
          <span>{t.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      {variant === 'investor' && (
        <label className="field">
          <span>{t.interestInvestor}</span>
          <textarea required name="message" rows={4} />
        </label>
      )}
      <label className="check-field">
        <input type="checkbox" name="consent_processing" value="yes" required />
        <span>
          {variant === 'investor' ? t.consentInvestor : t.consentWhitepaper}
        </span>
      </label>
      <label className="check-field">
        <input type="checkbox" name="consent_updates" value="yes" />
        <span>{t.consentUpdates}</span>
      </label>
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : variant === 'investor' ? t.sendEnquiry : t.getWhitepaper}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          <WithEmail text={t.error} email={variant === 'investor' ? SITE.emails.investors : SITE.emails.sales} />
        </p>
      )}
    </form>
  );
}
