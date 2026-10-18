// Visitors who have already shared their details are never asked twice.
const LEAD_KEY = 'ls_lead_v1';

export function hasLead(): boolean {
  try {
    return window.localStorage.getItem(LEAD_KEY) !== null;
  } catch {
    return false;
  }
}

export function rememberLead(email: string) {
  try {
    window.localStorage.setItem(LEAD_KEY, JSON.stringify({ email, at: Date.now() }));
  } catch {
    /* storage unavailable: the visitor simply sees the form again next time */
  }
}
