// Pure calculator logic. No DOM in here, so the tests can import it directly.

export const STATUSES = ['have', 'later', 'nope'];

const round2 = (n) => Math.round(n * 100) / 100;

// "$1,284" for whole numbers, "$358.80" when there are cents (unless whole: true).
export function money(n, { whole = false } = {}) {
  const v = whole ? Math.round(n) : round2(n);
  const hasCents = !whole && Math.abs(v - Math.round(v)) > 0.001;
  return '$' + v.toLocaleString('en-US', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  });
}

export function clampQty(line, qty) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return line.qty.default;
  const stepped = Math.round(n / line.qty.step) * line.qty.step;
  return Math.min(line.qty.max, Math.max(line.qty.min, stepped));
}

// Value of one calculator line for a year, in dollars.
export function lineValue(line, qty, prices) {
  const p = prices[line.price];
  if (!p) throw new Error(`Unknown price key "${line.price}" on line "${line.id}"`);
  return round2(clampQty(line, qty) * p.price * line.mult);
}

// "2 × $14.95 × 12 months = $358.80"
export function mathText(line, qty, prices) {
  const p = prices[line.price];
  const q = clampQty(line, qty);
  const parts = [`${q} × ${money(p.price)}`];
  if (line.mult !== 1) parts.push(`${line.mult} ${line.multLabel}`);
  return `${parts.join(' × ')} = ${money(lineValue(line, q, prices))}`;
}

export function defaultState(lines) {
  const state = {};
  for (const line of lines) state[line.id] = { status: line.status, qty: line.qty.default };
  return state;
}

// Sanitize anything loaded from storage or a preset so bad values can't leak in.
export function normalizeState(lines, raw) {
  const base = defaultState(lines);
  if (!raw || typeof raw !== 'object') return base;
  for (const line of lines) {
    const r = raw[line.id];
    if (!r || typeof r !== 'object') continue;
    if (STATUSES.includes(r.status)) base[line.id].status = r.status;
    if (r.qty !== undefined) base[line.id].qty = clampQty(line, r.qty);
  }
  return base;
}

export function totals(lines, state, prices) {
  let total = 0;
  let later = 0;
  const rows = [];
  for (const line of lines) {
    const s = state[line.id] || { status: line.status, qty: line.qty.default };
    const value = lineValue(line, s.qty, prices);
    const counted = s.status !== 'nope' && value > 0;
    if (counted) {
      total += value;
      if (s.status === 'later') later += value;
    }
    rows.push({ id: line.id, value, counted, status: s.status });
  }
  return { total: round2(total), later: round2(later), rows };
}

// The biggest counted lines, largest first.
export function topLines(lines, state, prices, n = 3) {
  const { rows } = totals(lines, state, prices);
  const byId = Object.fromEntries(lines.map((l) => [l.id, l]));
  return rows
    .filter((r) => r.counted)
    .sort((a, b) => b.value - a.value)
    .slice(0, n)
    .map((r) => ({ line: byId[r.id], value: r.value }));
}

export function listJoin(words) {
  if (words.length === 0) return '';
  if (words.length === 1) return words[0];
  if (words.length === 2) return `${words[0]} and ${words[1]}`;
  return `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
}

export function shareText(total, top, url) {
  const amount = money(total, { whole: true });
  if (total <= 0 || top.length === 0) {
    return `Turns out a free library card gets you way more than books. See what yours is worth: ${url}`;
  }
  const things = listJoin(top.map((t) => t.line.shareName));
  return `My library card is worth ${amount} a year. ${capitalize(things)}, all free. What's yours worth? ${url}`;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
