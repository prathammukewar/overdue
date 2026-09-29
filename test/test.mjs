// Run with: node test/test.mjs  (no dependencies, uses Node's built-in test runner)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHECKED, CHECKED_LABEL, CATEGORIES, PRICES, ITEMS, HIGHLIGHTS, CALC, PRESETS,
  LIBRARIES, STATES, HOWTO, STUDENT_TIP,
} from '../js/data.js';
import {
  money, clampQty, lineValue, mathText, defaultState, normalizeState, totals, topLines, listJoin, shareText,
} from '../js/calc.js';
import { SITE_URL, REPO_URL, AUTHOR_NAME, AUTHOR_URL, GOATCOUNTER } from '../js/config.js';

const EMDASH = String.fromCharCode(0x2014);
const https = (u) => typeof u === 'string' && /^https:\/\/[^\s/]+\.[^\s]+$/.test(u);

// Walk any object and hand back every string that looks like a URL.
function urlsIn(obj, path = '') {
  const out = [];
  if (typeof obj === 'string') {
    if (/^[a-z]+:\/\//i.test(obj) || obj.startsWith('//') || obj.startsWith('www.')) out.push([path, obj]);
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => out.push(...urlsIn(v, `${path}[${i}]`)));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) out.push(...urlsIn(v, path ? `${path}.${k}` : k));
  }
  return out;
}

/* ---------- money + math ---------- */

test('money formats whole dollars and cents', () => {
  assert.equal(money(0), '$0');
  assert.equal(money(1284), '$1,284');
  assert.equal(money(358.8), '$358.80');
  assert.equal(money(14.95), '$14.95');
  assert.equal(money(1283.6, { whole: true }), '$1,284');
  assert.equal(money(12345.678), '$12,345.68');
});

const fakePrices = {
  sub: { name: 'Sub', price: 11.99, per: 'month' },
  credit: { name: 'Credit', price: 14.95, per: 'month' },
};
const fakeLines = [
  { id: 'a', category: 'x', label: 'A', price: 'credit', qty: { default: 2, min: 0, max: 10, step: 1 }, mult: 12, multLabel: 'months', status: 'later', unit: { one: 'a', many: 'as' }, shareName: 'audiobooks' },
  { id: 'b', category: 'x', label: 'B', price: 'sub', qty: { default: 12, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'have', unit: { one: 'month', many: 'months' }, shareName: 'ebooks' },
  { id: 'c', category: 'x', label: 'C', price: 'sub', qty: { default: 3, min: 0, max: 12, step: 1 }, mult: 1, multLabel: '', status: 'nope', unit: { one: 'month', many: 'months' }, shareName: 'movies' },
];

test('lineValue multiplies usage by price by periods', () => {
  assert.equal(lineValue(fakeLines[0], 2, fakePrices), 358.8);
  assert.equal(lineValue(fakeLines[1], 12, fakePrices), 143.88);
  assert.equal(lineValue(fakeLines[1], 0, fakePrices), 0);
});

test('clampQty keeps usage inside the slider range and on its step', () => {
  assert.equal(clampQty(fakeLines[0], 99), 10);
  assert.equal(clampQty(fakeLines[0], -4), 0);
  assert.equal(clampQty(fakeLines[0], 2.4), 2);
  assert.equal(clampQty(fakeLines[0], 'garbage'), 2);
});

test('mathText shows the work', () => {
  assert.equal(mathText(fakeLines[0], 2, fakePrices), '2 × $14.95 × 12 months = $358.80');
  assert.equal(mathText(fakeLines[1], 9, fakePrices), '9 × $11.99 = $107.91');
});

test('totals count "have" and "later", skip "nope", and track the unconfirmed part', () => {
  const s = defaultState(fakeLines);
  const t = totals(fakeLines, s, fakePrices);
  assert.equal(t.total, 502.68);
  assert.equal(t.later, 358.8);
  assert.equal(t.rows.find((r) => r.id === 'c').counted, false);
  s.c.status = 'have';
  assert.equal(totals(fakeLines, s, fakePrices).total, 502.68 + 35.97);
});

test('normalizeState throws out junk from storage', () => {
  const s = normalizeState(fakeLines, { a: { status: 'hacked', qty: 500 }, b: 'nope', zzz: {} });
  assert.equal(s.a.status, 'later');
  assert.equal(s.a.qty, 10);
  assert.equal(s.b.status, 'have');
  assert.equal(Object.keys(s).length, 3);
  assert.deepEqual(normalizeState(fakeLines, null), defaultState(fakeLines));
});

test('topLines returns the biggest counted lines first', () => {
  const top = topLines(fakeLines, defaultState(fakeLines), fakePrices, 3);
  assert.deepEqual(top.map((t) => t.line.id), ['a', 'b']);
});

test('listJoin reads like English', () => {
  assert.equal(listJoin([]), '');
  assert.equal(listJoin(['a']), 'a');
  assert.equal(listJoin(['a', 'b']), 'a and b');
  assert.equal(listJoin(['a', 'b', 'c']), 'a, b and c');
});

/* ---------- share text ---------- */

test('share text has the amount, the top things and the URL', () => {
  const top = topLines(fakeLines, defaultState(fakeLines), fakePrices, 3);
  const text = shareText(502.68, top, SITE_URL);
  assert.match(text, /\$503 a year/);
  assert.match(text, /Audiobooks and ebooks/);
  assert.ok(text.endsWith(SITE_URL));
  assert.ok(!text.includes(EMDASH), 'no em dashes');
});

test('share text still works with nothing ticked', () => {
  const text = shareText(0, [], SITE_URL);
  assert.ok(text.includes(SITE_URL));
  assert.ok(!text.includes('$0'));
});

test('share text for the real default state', () => {
  const s = defaultState(CALC);
  const t = totals(CALC, s, PRICES);
  const text = shareText(t.total, topLines(CALC, s, PRICES, 3), SITE_URL);
  assert.ok(text.includes(money(t.total, { whole: true })));
  assert.ok(text.length < 280, `share text should fit a tweet, got ${text.length}`);
});

/* ---------- data integrity ---------- */

test('checked stamp is September 2026', () => {
  assert.equal(CHECKED, '2026-09');
  assert.equal(CHECKED_LABEL, 'September 2026');
});

test('ids are unique everywhere', () => {
  for (const [name, list] of [['CATEGORIES', CATEGORIES], ['ITEMS', ITEMS], ['CALC', CALC], ['LIBRARIES', LIBRARIES], ['HIGHLIGHTS', HIGHLIGHTS]]) {
    const ids = list.map((x) => x.id);
    assert.equal(new Set(ids).size, ids.length, `duplicate id in ${name}: ${ids.filter((x, i) => ids.indexOf(x) !== i)}`);
  }
});

test('every catalog item has source, checked, category, and a price where it claims one', () => {
  const cats = new Set(CATEGORIES.map((c) => c.id));
  for (const item of ITEMS) {
    assert.ok(cats.has(item.category), `${item.id}: unknown category ${item.category}`);
    assert.ok(https(item.source), `${item.id}: source must be https`);
    assert.equal(item.checked, '2026-09', `${item.id}: checked`);
    assert.ok(item.name && item.what, `${item.id}: name and what`);
    assert.ok(['most', 'many', 'some'].includes(item.common), `${item.id}: common`);
    assert.ok(['home', 'branch', 'both'].includes(item.where), `${item.id}: where`);
    if (item.replaces) {
      const p = PRICES[item.replaces];
      assert.ok(p, `${item.id}: replaces unknown price ${item.replaces}`);
    }
    if (item.check) assert.ok(https(item.check.url) && item.check.label, `${item.id}: check link`);
  }
  for (const c of CATEGORIES) {
    assert.ok(ITEMS.some((i) => i.category === c.id), `category ${c.id} is empty`);
  }
});

test('the states list covers all 50 states plus DC', () => {
  assert.equal(Object.keys(STATES).length, 51);
});

test('every price has a positive number, a period, a source and a checked stamp', () => {
  for (const [key, p] of Object.entries(PRICES)) {
    assert.ok(typeof p.price === 'number' && p.price > 0, `${key}: price`);
    assert.ok(p.name && p.per, `${key}: name/per`);
    assert.ok(https(p.source), `${key}: source`);
    assert.equal(p.checked, '2026-09', `${key}: checked`);
  }
});

test('every price is used by something', () => {
  const used = new Set([...ITEMS.map((i) => i.replaces), ...CALC.map((l) => l.price)]);
  for (const key of Object.keys(PRICES)) assert.ok(used.has(key), `unused price ${key}`);
});

test('calculator lines are well formed', () => {
  const cats = new Set(CATEGORIES.map((c) => c.id));
  for (const line of CALC) {
    assert.ok(cats.has(line.category), `${line.id}: category`);
    assert.ok(PRICES[line.price], `${line.id}: price key ${line.price}`);
    assert.ok(['have', 'later', 'nope'].includes(line.status), `${line.id}: status`);
    const q = line.qty;
    assert.ok(q.min <= q.default && q.default <= q.max && q.step > 0, `${line.id}: qty range`);
    if (q.suggest !== undefined) assert.ok(q.suggest > 0 && q.suggest <= q.max, `${line.id}: suggest in range`);
    if (q.default === 0) assert.ok(q.suggest > 0, `${line.id}: lines that start at zero need a suggested amount`);
    assert.ok(line.mult > 0 && (line.mult === 1 || line.multLabel), `${line.id}: mult`);
    assert.ok(line.unit.one && line.unit.many && line.shareName && line.label && line.via, `${line.id}: labels`);
    assert.equal(line.checked, '2026-09', `${line.id}: checked`);
    for (const id of line.items) assert.ok(ITEMS.find((i) => i.id === id), `${line.id}: unknown item ${id}`);
  }
});

test('the default total lands in a believable range', () => {
  const t = totals(CALC, defaultState(CALC), PRICES);
  assert.ok(t.total > 400 && t.total < 2500, `default total ${t.total}`);
});

test('presets only touch real lines with valid values', () => {
  for (const [name, preset] of Object.entries(PRESETS)) {
    for (const [id, v] of Object.entries(preset)) {
      const line = CALC.find((l) => l.id === id);
      assert.ok(line, `${name}: unknown line ${id}`);
      if (v.status) assert.ok(['have', 'later', 'nope'].includes(v.status), `${name}.${id}.status`);
      if (v.qty !== undefined) assert.equal(clampQty(line, v.qty), v.qty, `${name}.${id}.qty out of range`);
    }
  }
});

test('highlights point at real catalog items or sections and have sources', () => {
  for (const h of HIGHLIGHTS) {
    assert.ok(h.href ? /^#[a-z]/.test(h.href) : ITEMS.find((i) => i.id === h.item), `${h.id}: item ${h.item}`);
    assert.ok(h.title && h.text && h.stamp && h.kicker, `${h.id}: text`);
    assert.ok(https(h.source), `${h.id}: source`);
    assert.equal(h.checked, '2026-09', `${h.id}: checked`);
  }
});

test('libraries have rules, fees, sources and valid states', () => {
  for (const lib of LIBRARIES) {
    assert.ok(https(lib.signupUrl), `${lib.id}: signupUrl`);
    assert.ok(https(lib.source), `${lib.id}: source`);
    assert.equal(lib.checked, '2026-09', `${lib.id}: checked`);
    assert.ok(lib.who && lib.cardType && lib.name && lib.city, `${lib.id}: text`);
    assert.ok(STATES[lib.state], `${lib.id}: state ${lib.state}`);
    for (const st of lib.free) assert.ok(STATES[st], `${lib.id}: free state ${st}`);
    // Every library on the list has to reach past its own city somehow.
    assert.ok(lib.free.length || lib.paid || lib.youth, `${lib.id}: offers nothing beyond locals`);
    if (lib.paid) {
      assert.ok(lib.paid.fee > 0, `${lib.id}: paid fee`);
      assert.ok(lib.paid.where === 'anyone' || (Array.isArray(lib.paid.where) && lib.paid.where.every((st) => STATES[st])), `${lib.id}: paid.where`);
      assert.equal(typeof lib.paid.online, 'boolean');
      assert.equal(typeof lib.paid.digital, 'boolean');
      assert.ok(lib.paid.note, `${lib.id}: paid note`);
    }
    if (lib.youth) assert.ok(https(lib.youth.url) && lib.youth.ages && lib.youth.text, `${lib.id}: youth`);
  }
});

test('how-to steps and the student tip cite sources', () => {
  for (const s of HOWTO) {
    assert.ok(s.title && s.text, 'step text');
    assert.ok(https(s.source), `step ${s.title}: source`);
    assert.equal(s.checked, '2026-09');
  }
  for (const x of STUDENT_TIP.examples) {
    assert.ok(https(x.url), `student tip ${x.name}`);
  }
  assert.equal(STUDENT_TIP.checked, '2026-09');
});

test('every URL anywhere in the data is https', () => {
  const all = urlsIn({ CATEGORIES, PRICES, ITEMS, HIGHLIGHTS, CALC, PRESETS, LIBRARIES, HOWTO, STUDENT_TIP });
  assert.ok(all.length > 50, 'expected plenty of URLs');
  for (const [path, u] of all) assert.ok(https(u), `${path}: ${u}`);
});

test('no em dashes anywhere in the data', () => {
  const blob = JSON.stringify({ CATEGORIES, PRICES, ITEMS, HIGHLIGHTS, CALC, PRESETS, LIBRARIES, HOWTO, STUDENT_TIP });
  assert.ok(!blob.includes(EMDASH));
});

test('config is filled in', () => {
  assert.equal(AUTHOR_NAME, 'Pratham Mukewar');
  assert.equal(AUTHOR_URL, 'https://github.com/prathammukewar');
  assert.equal(REPO_URL, 'https://github.com/prathammukewar/overdue');
  assert.equal(SITE_URL, 'https://prathammukewar.github.io/overdue/');
  assert.equal(typeof GOATCOUNTER, 'string');
});
