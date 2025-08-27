export function cleanEmail(v) {
  return (v || '').trim().toLowerCase();
}
export function cleanPassword(v) {
  return (v || '').trim();
}
export function isStrongEnough(pw) {
  return pw.length >= 8; // adjust as needed
}
