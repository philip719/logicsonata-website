// Checks for the details the chat assistant collects. The server repeats the email and phone
// checks (public/api/chat.php), so these exist to give the visitor instant, friendly feedback.

const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

export const validEmail = (email: string) => EMAIL.test(email) && !email.includes('..');

/** 7 to 15 digits, optionally starting with +; spaces, dots, dashes and brackets allowed. */
export function validPhone(phone: string) {
  const digits = phone.replace(/\D/g, '').length;
  return /^\+?[0-9 ().-]{7,24}$/.test(phone) && digits >= 7 && digits <= 15;
}

/** Trims the address and lower-cases the domain (the part before @ is left exactly as typed). */
export function normaliseEmail(text: string) {
  const email = text.trim().replace(/^mailto:/i, '').replace(/\s+/g, '');
  const at = email.lastIndexOf('@');
  return at < 0 ? email : email.slice(0, at + 1) + email.slice(at + 1).toLowerCase();
}

const COMMON_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'live.com'];
const TLD_FIXES: Record<string, string> = { con: 'com', cmo: 'com', ocm: 'com', vom: 'com', xom: 'com', cpm: 'com', comm: 'com', ner: 'net', nte: 'net', ogr: 'org' };

/** Edit distance where swapping two neighbouring letters counts as one edit (gmial -> gmail). */
function distance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** A likely correction for a mistyped address (jane@gmial.com, jane@acme.con), or null. */
export function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf('@');
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (COMMON_DOMAINS.includes(domain)) return null;
  const near = COMMON_DOMAINS.find((d) => distance(domain, d) === 1);
  if (near) return `${local}@${near}`;
  const parts = domain.split('.');
  const fix = TLD_FIXES[parts[parts.length - 1]];
  return fix ? `${local}@${[...parts.slice(0, -1), fix].join('.')}` : null;
}

const GREETINGS = /^(hi|hii+|hello|hey|hallo|halo|hai|helo|yo|good (morning|afternoon|evening)|selamat (pagi|siang|sore|malam)|xin chào|chào|chao|สวัสดี(ครับ|ค่ะ)?|你好|您好|嗨|哈喽)[\s!.,，。！]*$/i;

/**
 * What the visitor typed when asked for their name: a usable name, a greeting, a question they want
 * answered first, or something that is not a name.
 */
export function readName(text: string): 'name' | 'greeting' | 'question' | 'invalid' {
  const t = text.trim();
  if (GREETINGS.test(t)) return 'greeting';
  if (/[?？]/.test(t) || t.split(/\s+/).length > 5 || t.length > 60) return 'question';
  const tooShort = [...t].length < 2 && !/\p{Script=Han}/u.test(t);
  if (tooShort || !/\p{L}/u.test(t) || /[@\d]|https?:|www\./i.test(t)) return 'invalid';
  return 'name';
}
