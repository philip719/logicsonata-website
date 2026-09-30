'use client';

import { useEffect, useState } from 'react';
import { MARKETS, SITE } from '@/lib/site';
import { Icon } from './Icon';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Variant = 'whitepaper' | 'investor';

// Visitors who have already shared their details are never asked twice.
const LEAD_KEY = 'ls_lead_v1';

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

export function LeadForm({
  variant,
  subject,
  asset,
  downloadUrl,
}: {
  variant: Variant;
  subject: string;
  asset?: string;
  downloadUrl?: string;
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
        <h2 className="h3">{status === 'sent' ? 'Your whitepaper is ready.' : 'Welcome back.'}</h2>
        <p>
          {status === 'sent'
            ? 'Your download has started. If it did not, use the button below. A specialist may follow up to answer any questions.'
            : 'You have already shared your details with us, so this whitepaper is ready to download.'}
        </p>
        <a href={downloadUrl} className="btn btn-primary btn-lg" download>
          <Icon name="book" size={18} />
          Download {asset ?? 'whitepaper'} (PDF)
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
        <h2 className="h3">Thank you. We will be in touch.</h2>
        <p>Our investor relations team replies personally to every enquiry, usually within a few business days.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="form" value={variant} />
      {asset && <input type="hidden" name="asset" value={asset} />}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      <div className="form-row">
        <label className="field">
          <span>Full name *</span>
          <input required name="name" type="text" autoComplete="name" />
        </label>
        <label className="field">
          <span>{variant === 'investor' ? 'Email *' : 'Work email *'}</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>{variant === 'investor' ? 'Organisation *' : 'Company *'}</span>
          <input required name="company" type="text" autoComplete="organization" />
        </label>
        {variant === 'investor' ? (
          <label className="field">
            <span>Investor type *</span>
            <select required name="investor_type" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option>Venture capital</option>
              <option>Corporate or strategic</option>
              <option>Family office</option>
              <option>Angel investor</option>
              <option>Other</option>
            </select>
          </label>
        ) : (
          <label className="field">
            <span>Role</span>
            <input name="role" type="text" autoComplete="organization-title" />
          </label>
        )}
      </div>
      <div className="form-row">
        <label className="field">
          <span>Country *</span>
          <select required name="country" defaultValue="">
            <option value="" disabled>
              Select a country
            </option>
            {MARKETS.map((m) => (
              <option key={m.code}>{m.name}</option>
            ))}
            <option>Other</option>
          </select>
        </label>
        <label className="field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      {variant === 'investor' && (
        <label className="field">
          <span>Tell us about your interest *</span>
          <textarea required name="message" rows={4} />
        </label>
      )}
      <label className="check-field">
        <input type="checkbox" name="consent_processing" value="yes" required />
        <span>
          {variant === 'investor'
            ? 'I agree that Logic Sonata may use these details to respond to my enquiry. *'
            : 'I agree that Logic Sonata may use these details to send me this whitepaper and follow up about it. *'}
        </span>
      </label>
      <label className="check-field">
        <input type="checkbox" name="consent_updates" value="yes" />
        <span>Send me occasional updates on private AI. You can unsubscribe at any time.</span>
      </label>
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : variant === 'investor' ? 'Send enquiry' : 'Get the whitepaper'}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong. Please try again, or email{' '}
          <a
            className="email-link"
            href={`mailto:${variant === 'investor' ? SITE.emails.investors : SITE.emails.sales}`}
          >
            {variant === 'investor' ? SITE.emails.investors : SITE.emails.sales}
          </a>
          .
        </p>
      )}
    </form>
  );
}
