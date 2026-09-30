'use client';

import { useState } from 'react';
import { MARKETS, PRODUCTS, SITE } from '@/lib/site';
import { Icon } from './Icon';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ConsultationForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon">
          <Icon name="check" size={28} />
        </span>
        <h2 className="h3">Thank you. We will be in touch.</h2>
        <p>Someone from Logic Sonata will reach out within one business day to schedule your consultation.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="hidden" name="_subject" value="Private AI Consultation request" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      <div className="form-row">
        <label className="field">
          <span>Full name *</span>
          <input required name="name" type="text" autoComplete="name" />
        </label>
        <label className="field">
          <span>Work email *</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>Company *</span>
          <input required name="company" type="text" autoComplete="organization" />
        </label>
        <label className="field">
          <span>Role</span>
          <input name="role" type="text" autoComplete="organization-title" />
        </label>
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
      <label className="field">
        <span>What would you like to explore?</span>
        <select name="interest" defaultValue="Not sure yet">
          <option>Not sure yet</option>
          {PRODUCTS.map((p) => (
            <option key={p.id}>{p.name}</option>
          ))}
          <option>On-premise AI hardware</option>
          <option>AI governance and policy</option>
        </select>
      </label>
      <label className="field">
        <span>Tell us about your goals or concerns</span>
        <textarea name="message" rows={4} />
      </label>
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : SITE.primaryCta.label}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong sending your request. Please try again in a moment.
        </p>
      )}
      <p className="form-note">
        No obligation. We use your details only to respond to your enquiry.
      </p>
    </form>
  );
}
