'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/i18n/config';
import type { CareersDict } from '@/i18n/locales/en/careers';
import { MARKET_NAMES_EN, SITE } from '@/lib/site';
import { Icon } from './Icon';
import { WithEmail } from './LeadForm';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Position = { id: string; value: string; label: string };

const MAX_BYTES = 5 * 1024 * 1024;
const EXTENSIONS = ['pdf', 'doc', 'docx'];

const formatSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

/**
 * Job application form. Posts the details and CV to the PHP script on the
 * Hostinger plan, which emails them to the careers inbox. Works without
 * JavaScript too: the script then redirects back with ?applied=1.
 */
export function CareersForm({
  lang,
  t,
  countries,
  positions,
  returnPath,
}: {
  lang: Locale;
  t: CareersDict['apply']['form'];
  countries: string[];
  positions: Position[];
  returnPath: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const email = SITE.emails.careers;

  // "Apply for this role" links (#apply-<role id>) preselect the position.
  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#apply-(.+)$/);
      const role = match && positions.find((p) => p.id === match[1]);
      if (role) {
        setPosition(role.value);
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    if (new URLSearchParams(window.location.search).get('applied') === '1') setStatus('sent');
    return () => window.removeEventListener('hashchange', fromHash);
  }, [positions]);

  function checkFile(f: File | null): string | null {
    if (!f) return null;
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!EXTENSIONS.includes(ext)) return t.errFileType;
    if (f.size > MAX_BYTES) return t.errFileSize;
    return null;
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    const problem = checkFile(f);
    setError(problem);
    setFile(problem ? null : f);
    if (problem && fileRef.current) fileRef.current.value = '';
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const problem = checkFile(file);
    if (problem) return setError(problem);
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch(SITE.careersEndpoint, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || String(res.status));
      setStatus('sent');
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      setStatus('error');
      setError(code === 'file_type' ? t.errFileType : code === 'file_size' ? t.errFileSize : code === 'rate' ? t.errRate : t.errGeneric);
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <span className="form-success-icon">
          <Icon name="check" size={28} />
        </span>
        <h2 className="h3">{t.thanksTitle}</h2>
        <p>{t.thanksBody}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} action={SITE.careersEndpoint} method="post" encType="multipart/form-data">
      <input type="hidden" name="language" value={lang} />
      <input type="hidden" name="return" value={returnPath} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
      <div className="form-row">
        <label className="field">
          <span>{t.fullName}</span>
          <input required name="name" type="text" autoComplete="name" maxLength={120} />
        </label>
        <label className="field">
          <span>{t.email}</span>
          <input required name="email" type="email" autoComplete="email" maxLength={200} />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>{t.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={60} />
        </label>
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
      </div>
      <label className="field">
        <span>{t.position}</span>
        <select required name="position" value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="" disabled>
            {t.selectPosition}
          </option>
          {positions.map((p) => (
            <option key={p.id} value={p.value}>
              {p.label}
            </option>
          ))}
          <option value="General application">{t.general}</option>
        </select>
      </label>
      <label className="field">
        <span>{t.linkedin}</span>
        <input name="linkedin" type="text" inputMode="url" autoComplete="url" placeholder={t.linkedinPlaceholder} maxLength={300} />
      </label>
      <div className="field">
        <span id="cv-label">{t.cv}</span>
        <label className={`file-field${file ? ' has-file' : ''}`}>
          <input
            ref={fileRef}
            required
            name="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-labelledby="cv-label"
            aria-describedby="cv-hint"
            onChange={onFile}
          />
          <span className="file-field-icon">
            <Icon name={file ? 'check' : 'book'} size={20} />
          </span>
          <span className="file-field-text">
            <strong>{file ? file.name : t.cvCta}</strong>
            <small id="cv-hint">{file ? `${formatSize(file.size)} · ${t.cvChange}` : t.cvHint}</small>
          </span>
        </label>
      </div>
      <label className="field">
        <span>{t.message}</span>
        <textarea name="message" rows={4} maxLength={4000} />
      </label>
      <label className="check-field">
        <input type="checkbox" name="consent" value="yes" required />
        <span>{t.consent}</span>
      </label>
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.submit}
        {status !== 'sending' && <Icon name="arrow" size={18} />}
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error.includes('{email}') ? <WithEmail text={error} email={email} /> : error}
        </p>
      )}
    </form>
  );
}
