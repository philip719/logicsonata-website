'use client';

import { useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CommonDict } from '@/i18n/locales/en/common';
import { MARKET_NAMES_EN, SITE } from '@/lib/site';
import { Icon } from './Icon';
import { WithEmail } from './LeadForm';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type Option = { value: string; label: string };

export function ConsultationForm({
  lang,
  t,
  submitLabel,
  countries,
  products,
}: {
  lang: Locale;
  t: CommonDict['forms'];
  submitLabel: string;
  countries: string[];
  products: Option[];
}) {
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
        <h2 className="h3">{t.consultThanksTitle}</h2>
        <p>{t.consultThanksBody}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input type="hidden" name="_subject" value={`Private AI Consultation request${lang === 'en' ? '' : ` [${lang.toUpperCase()}]`}`} />
      <input type="hidden" name="language" value={lang} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      <div className="form-row">
        <label className="field">
          <span>{t.fullName}</span>
          <input required name="name" type="text" autoComplete="name" />
        </label>
        <label className="field">
          <span>{t.workEmail}</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>{t.company}</span>
          <input required name="company" type="text" autoComplete="organization" />
        </label>
        <label className="field">
          <span>{t.role}</span>
          <input name="role" type="text" autoComplete="organization-title" />
        </label>
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
      <label className="field">
        <span>{t.consultInterest}</span>
        <select name="interest" defaultValue="Not sure yet">
          <option value="Not sure yet">{t.consultNotSure}</option>
          {products.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
          <option value="On-premise AI hardware">{t.consultHardware}</option>
          <option value="AI governance and policy">{t.consultGovernance}</option>
        </select>
      </label>
      <label className="field">
        <span>{t.consultGoals}</span>
        <textarea name="message" rows={4} />
      </label>
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : submitLabel}
      </button>
      {status === 'error' && (
        <p className="form-error" role="alert">
          <WithEmail text={t.consultError} email={SITE.emails.sales} />
        </p>
      )}
      <p className="form-note">
        {t.consultNote}
      </p>
    </form>
  );
}
