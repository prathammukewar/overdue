import { AUTHOR_NAME, AUTHOR_URL, REPO_URL, SITE_URL, GOATCOUNTER } from './config.js';
import {
  CHECKED_LABEL, CATEGORIES, PRICES, ITEMS, HIGHLIGHTS, CALC, PRESETS,
  LIBRARIES, STATES, HOWTO, STUDENT_TIP,
} from './data.js';
import {
  money, clampQty, lineValue, mathText, defaultState, normalizeState, totals, topLines, shareText,
} from './calc.js';
import { drawShareCard, copyImage, downloadImage, copyText, canvasBlob } from './share.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function el(tag, attrs = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const kid of kids.flat()) {
    if (kid === null || kid === undefined || kid === false) continue;
    node.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return node;
}

const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* private mode, fine */ }
  },
};

const itemById = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

const PER = { month: '/mo', year: '/yr', '4 weeks': ' every 4 weeks', hour: '/hr', visit: ' a visit', day: '/day', each: ' each', return: ' a return', signature: ' a signature' };

export function priceLabel(p) {
  return `${money(p.price)}${PER[p.per] ?? ` per ${p.per}`}`;
}

/* ---------- theme ---------- */

function initTheme() {
  const btn = $('#theme-toggle');
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const current = () => document.documentElement.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
  const label = () => btn.setAttribute('aria-label', current() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set('overdue-theme', next);
    label();
  });
  mq.addEventListener?.('change', label);
  label();
}

/* ---------- hooks ---------- */

function renderHooks() {
  const list = $('#hooks');
  for (const h of HIGHLIGHTS) {
    list.append(el('li', { class: 'hook' },
      el('p', { class: 'hook-kicker', text: h.kicker }),
      el('h3', { text: h.title }),
      el('p', { text: h.text }),
      el('div', { class: 'hook-foot' },
        el('span', { class: 'stamp', text: h.stamp }),
        el('a', { class: 'more', href: h.href || `#item-${h.item}` }, h.href ? 'See which ones' : 'Details',
          el('span', { class: 'sr-only', text: `: ${h.title}` })),
      ),
    ));
  }
}

/* ---------- catalog ---------- */

const COMMON = {
  most: { n: 3, label: 'Most libraries' },
  many: { n: 2, label: 'Many libraries' },
  some: { n: 1, label: 'Some libraries' },
};

const CATALOG_PEEK = 8;

const WHERE = { home: 'From home', branch: 'At the library', both: 'Home or branch' };

function entryCard(item) {
  const c = COMMON[item.common];
  const dots = el('span', { class: 'dots', 'aria-hidden': 'true' },
    [1, 2, 3].map((n) => el('i', { class: n <= c.n ? 'on' : null })));
  let instead = null;
  if (item.replaces) {
    const p = PRICES[item.replaces];
    instead = el('p', { class: 'instead' },
      el('span', { class: 'lbl', text: 'Instead of paying for' }),
      `${p.name}${p.note ? ` (${p.note})` : ''}: `, el('b', { text: priceLabel(p) }));
  } else if (item.replacesText) {
    instead = el('p', { class: 'instead' },
      el('span', { class: 'lbl', text: 'Instead of' }), item.replacesText);
  }
  const check = item.check
    ? el('a', { href: item.check.url, target: '_blank', rel: 'noopener' }, `${item.check.label} `, el('span', { 'aria-hidden': 'true' }, '→'))
    : el('span', { class: 'ask', text: item.checkHint || 'Ask at your library' });
  return el('li', { class: 'entry', id: `item-${item.id}` },
    el('div', { class: 'entry-top' },
      el('span', { class: 'where-tag', text: WHERE[item.where] }),
      el('span', { class: 'common' }, dots, c.label),
    ),
    el('h3', { text: item.name }),
    el('p', { class: 'what', text: item.what }),
    instead,
    el('div', { class: 'entry-links' },
      check,
      el('span', { class: 'srcs' },
        el('a', { class: 'src', href: item.source, target: '_blank', rel: 'noopener' }, 'source', el('span', { class: 'sr-only', text: ` for ${item.name}` })),
        item.source2 ? el('a', { class: 'src', href: item.source2, target: '_blank', rel: 'noopener' }, 'more', el('span', { class: 'sr-only', text: ` about ${item.name}` })) : null),
    ),
  );
}

function initCatalog() {
  const filters = $('#cat-filters');
  const list = $('#catalog-list');
  const count = $('#cat-count');
  const fHome = $('#f-home');
  const fCommon = $('#f-common');
  const more = $('#cat-more');
  const narrow = window.matchMedia('(max-width: 640px)');
  let active = 'all';
  let expanded = false;

  const chip = (id, name, n) => el('button', {
    class: 'chip', type: 'button', 'data-cat': id, 'aria-pressed': String(id === active),
    onclick: () => { active = id; sync(); },
  }, name, el('span', { class: 'n', text: String(n) }));

  filters.append(chip('all', 'Everything', ITEMS.length));
  for (const c of CATEGORIES) filters.append(chip(c.id, c.short, ITEMS.filter((i) => i.category === c.id).length));

  function sync() {
    $$('.chip', filters).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === active)));
    const shown = ITEMS.filter((i) =>
      (active === 'all' || i.category === active) &&
      (!fHome.checked || i.where !== 'branch') &&
      (!fCommon.checked || i.common !== 'some'));
    const cap = !expanded && active === 'all' && narrow.matches ? CATALOG_PEEK : shown.length;
    list.replaceChildren(...shown.slice(0, cap).map(entryCard));
    if (!shown.length) list.append(el('li', { class: 'empty', text: 'Nothing matches those filters. Loosen one up.' }));
    more.hidden = cap >= shown.length;
    more.textContent = `Show all ${shown.length}`;
    count.textContent = `Showing ${Math.min(cap, shown.length)} of ${ITEMS.length}`;
  }
  more.addEventListener('click', () => {
    expanded = true;
    sync();
    list.children[CATALOG_PEEK]?.querySelector('a')?.focus();
  });
  narrow.addEventListener?.('change', sync);
  fHome.addEventListener('change', sync);
  fCommon.addEventListener('change', sync);
  sync();

  // Links to #item-x from the hook cards: make sure the card is visible first.
  window.addEventListener('hashchange', () => revealItem(location.hash));
  if (location.hash.startsWith('#item-')) revealItem(location.hash);

  function revealItem(hash) {
    if (!hash.startsWith('#item-')) return;
    if (!document.getElementById(hash.slice(1))) {
      active = 'all';
      expanded = true;
      fHome.checked = false;
      fCommon.checked = false;
      sync();
    }
    const target = document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ block: 'center' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  }
}

/* ---------- calculator ---------- */

const STATE_KEY = 'overdue-calc-v1';
let state;

function unitText(line, qty) {
  return `${qty} ${qty === 1 ? line.unit.one : line.unit.many}`;
}

let showExtras = false;

function renderCalc() {
  const form = $('#calc-form');
  for (const cat of CATEGORIES) {
    const lines = CALC.filter((l) => l.category === cat.id);
    if (!lines.length) continue;
    const group = el('div', { class: 'calc-group', 'data-cat': cat.id }, el('h3', { text: cat.name }));
    for (const line of lines) group.append(lineRow(line));
    form.append(group);
  }
  $('#calc-extras').addEventListener('click', () => {
    showExtras = !showExtras;
    syncCalc();
    if (showExtras) $(`#line-${CALC.find((l) => l.status === 'nope').id} input[type=radio]`)?.focus();
  });
}

// A line hides when it's an extra (off by default) that's still switched off, unless you asked to see them.
function lineVisible(line) {
  return showExtras || line.status !== 'nope' || state[line.id].status !== 'nope';
}

function lineRow(line) {
  const p = PRICES[line.price];
  const idp = `c-${line.id}`;
  const seg = el('div', { class: 'seg', role: 'radiogroup', 'aria-label': `Does your library have ${line.label}?` },
    [['have', 'Got it'], ['later', 'Check later'], ['nope', 'Nope']].map(([v, t]) =>
      el('label', {}, el('input', { type: 'radio', name: `${idp}-s`, value: v, 'data-line': line.id }), el('span', { text: t }))));
  const range = el('input', {
    type: 'range', id: `${idp}-q`, min: line.qty.min, max: line.qty.max, step: line.qty.step,
    'data-line': line.id, 'aria-describedby': `${idp}-math`,
  });
  const out = el('output', { for: `${idp}-q`, id: `${idp}-o` });
  return el('fieldset', { class: 'line', id: `line-${line.id}`, 'data-line': line.id },
    el('legend', { class: 'sr-only', text: line.label }),
    el('div', { class: 'line-name' },
      el('strong', { text: line.label }),
      el('span', { class: 'via', text: `via ${line.via}` })),
    seg,
    el('div', { class: 'usage' },
      el('label', { class: 'sr-only', for: `${idp}-q`, text: `${line.label}: ${line.unit.many}` }),
      range, out),
    el('p', { class: 'line-value', id: `${idp}-v` }),
    el('p', { class: 'line-math', id: `${idp}-math` },
      el('span', { class: 'eq' }), ' ',
      el('span', { class: 'priced' }, 'Priced as ',
        el('a', { href: p.source, target: '_blank', rel: 'noopener', text: p.name }),
        `${p.note ? ` (${p.note})` : ''} at ${priceLabel(p)}.`)),
  );
}

function loadState() {
  let raw = null;
  try { raw = JSON.parse(store.get(STATE_KEY) || 'null'); } catch { raw = null; }
  return normalizeState(CALC, raw);
}

function applyPreset(name) {
  state = normalizeState(CALC, { ...defaultState(CALC), ...PRESETS[name] });
  store.set(STATE_KEY, JSON.stringify(state));
  syncCalc();
  announceShare(`Switched to "${PRESET_NAMES[name]}".`);
}

const PRESET_NAMES = { typical: 'Typical library', big: 'Big-city library', books: 'Just books' };

function syncCalc() {
  for (const line of CALC) {
    const s = state[line.id];
    const row = $(`#line-${line.id}`);
    row.classList.toggle('is-nope', s.status === 'nope');
    row.classList.toggle('is-later', s.status === 'later');
    $$(`input[type=radio][data-line="${line.id}"]`, row).forEach((r) => { r.checked = r.value === s.status; });
    const range = $(`#c-${line.id}-q`);
    range.value = String(s.qty);
    const txt = unitText(line, s.qty);
    range.setAttribute('aria-valuetext', txt);
    $(`#c-${line.id}-o`).textContent = txt;
    const v = lineValue(line, s.qty, PRICES);
    const vEl = $(`#c-${line.id}-v`);
    vEl.textContent = money(v, { whole: true });
    vEl.setAttribute('aria-label', s.status === 'nope' ? `${money(v, { whole: true })}, not counted` : money(v, { whole: true }));
    $('.eq', row).textContent = `${mathText(line, s.qty, PRICES)}.`;
    row.hidden = !lineVisible(line);
  }
  for (const group of $$('.calc-group')) group.hidden = $$('.line', group).every((r) => r.hidden);
  const hiddenCount = CALC.filter((l) => !lineVisible(l)).length;
  const btn = $('#calc-extras');
  btn.textContent = showExtras ? 'Hide the extras' : `Show ${hiddenCount} more things to count`;
  btn.setAttribute('aria-expanded', String(showExtras));
  btn.hidden = !showExtras && hiddenCount === 0;
  updateTotals();
}

function updateTotals() {
  const t = totals(CALC, state, PRICES);
  const whole = money(t.total, { whole: true });
  $$('[data-total]').forEach((n) => { n.textContent = whole; });
  const later = $('#total-later');
  if (t.later > 0) {
    later.replaceChildren(el('b', { text: money(t.later, { whole: true }) }), ' of that is stuff you still need to check your library for.');
  } else if (t.total > 0) {
    later.textContent = 'Everything counted here is confirmed. Nice.';
  } else {
    later.textContent = 'Nothing counted yet. Mark a few things "Got it" or "Check later".';
  }
  scheduleShare();
}

function initCalc() {
  renderCalc();
  state = loadState();
  const form = $('#calc-form');
  form.addEventListener('input', (e) => {
    const id = e.target.dataset.line;
    if (!id) return;
    const line = CALC.find((l) => l.id === id);
    if (e.target.type === 'range') {
      state[id].qty = clampQty(line, e.target.value);
      // Dragging a slider on a line marked Nope means you want it counted.
      if (state[id].status === 'nope' && state[id].qty > 0) state[id].status = 'later';
    }
    if (e.target.type === 'radio') {
      state[id].status = e.target.value;
      // Saying yes to a line sitting at zero: give it a sensible starting amount.
      if (e.target.value !== 'nope' && state[id].qty === 0) state[id].qty = clampQty(line, line.qty.suggest ?? 1);
    }
    store.set(STATE_KEY, JSON.stringify(state));
    syncCalc();
  });
  $$('[data-preset]').forEach((b) => b.addEventListener('click', () => applyPreset(b.dataset.preset)));
  syncCalc();
}

/* ---------- share ---------- */

let shareQueued = false;
let fontsReady = false;

function currentShare() {
  const t = totals(CALC, state, PRICES);
  const top = topLines(CALC, state, PRICES, 3);
  const counted = t.rows.filter((r) => r.counted).length;
  return { total: t.total, top, more: Math.max(0, counted - top.length), url: SITE_URL };
}

function scheduleShare() {
  if (shareQueued) return;
  shareQueued = true;
  requestAnimationFrame(() => {
    shareQueued = false;
    if (fontsReady) drawShareCard($('#share-canvas'), currentShare());
  });
}

function announceShare(msg) {
  const s = $('#share-status');
  s.textContent = msg;
  clearTimeout(announceShare.t);
  announceShare.t = setTimeout(() => { s.textContent = ''; }, 5000);
}

function initShare() {
  const canvas = $('#share-canvas');
  const loads = [
    '900 100px Archivo', '800 50px Archivo', '700 26px "Courier Prime"', '400 26px "Courier Prime"',
  ].map((f) => document.fonts?.load(f).catch(() => null));
  Promise.all(loads).then(() => document.fonts?.ready).finally(() => {
    fontsReady = true;
    scheduleShare();
  });

  const filename = () => `library-card-worth-${Math.round(currentShare().total)}.png`;

  $('#share-copy').addEventListener('click', async () => {
    drawShareCard(canvas, currentShare());
    try {
      await copyImage(canvas);
      announceShare('Image copied. Paste it anywhere.');
    } catch (e) {
      announceShare(e.message === 'unsupported'
        ? "This browser can't copy images. Hit Download instead."
        : 'Copy got blocked. Try Download instead.');
    }
  });
  $('#share-download').addEventListener('click', async () => {
    drawShareCard(canvas, currentShare());
    try {
      await downloadImage(canvas, filename());
      announceShare('Downloaded.');
    } catch {
      announceShare('Download failed. Try again?');
    }
  });
  $('#share-text').addEventListener('click', async () => {
    const s = currentShare();
    try {
      await copyText(shareText(s.total, s.top, s.url));
      announceShare('Text copied. Go paste it in the group chat.');
    } catch {
      announceShare("Couldn't copy. Your browser said no.");
    }
  });

  const native = $('#share-native');
  if (navigator.share && navigator.canShare) {
    const probe = new File([new Blob(['x'], { type: 'image/png' })], 'x.png', { type: 'image/png' });
    if (navigator.canShare({ files: [probe] })) native.hidden = false;
  }
  native.addEventListener('click', async () => {
    const s = currentShare();
    drawShareCard(canvas, s);
    try {
      const blob = await canvasBlob(canvas);
      const file = new File([blob], filename(), { type: 'image/png' });
      await navigator.share({ files: [file], text: shareText(s.total, s.top, s.url) });
    } catch (e) {
      if (e && e.name !== 'AbortError') announceShare("Sharing didn't work here. Try Download.");
    }
  });
}

/* ---------- bigger libraries ---------- */

function paidOpenTo(lib, st) {
  if (!lib.paid) return false;
  return lib.paid.where === 'anyone' || (st && lib.paid.where.includes(st));
}

function initLibraries() {
  const select = $('#lib-state');
  const body = $('#libs-body');
  const summary = $('#lib-summary');
  const note = $('#libs-note');
  const libMore = $('#libs-more');
  let libsExpanded = false;
  libMore.addEventListener('click', () => {
    libsExpanded = true;
    sync();
  });

  select.append(el('option', { value: '', text: 'Show me all of them' }));
  for (const [code, name] of Object.entries(STATES).sort((a, b) => a[1].localeCompare(b[1]))) {
    select.append(el('option', { value: code, text: name }));
  }
  const saved = store.get('overdue-state');
  if (saved && STATES[saved]) select.value = saved;

  const feeText = (fee) => `${money(fee)}/yr`;

  function costCell(lib) {
    const bits = [];
    if (lib.free.length) {
      bits.push(el('span', { class: 'fee fee-free', text: 'Free' }),
        el('span', { class: 'fee-note', text: lib.freeNote || `if you live in ${lib.free.map((c) => STATES[c]).join(' or ')}` }));
    } else {
      bits.push(el('span', { class: 'fee fee-free', text: 'Free' }), el('span', { class: 'fee-note', text: 'if you are local' }));
    }
    if (lib.paid) {
      const who = lib.paid.where === 'anyone' ? 'anyone else' : `other ${lib.paid.where.map((c) => STATES[c]).join(', ')} residents`;
      bits.push(el('span', { class: 'fee fee-paid', text: feeText(lib.paid.fee) }),
        el('span', { class: 'fee-note', text: `${who}: ${lib.paid.note}` }));
    }
    return bits;
  }

  function row(lib, tag) {
    return el('tr', { class: tag ? 'match' : null },
      el('th', { scope: 'row' }, lib.name, el('span', { class: 'city', text: `${lib.city}, ${lib.state}` }),
        tag ? el('span', { class: 'tag-you', text: tag }) : null),
      el('td', { 'data-label': 'Who can get one' }, lib.who,
        el('span', { class: 'ctype', text: lib.cardType }),
        lib.youth ? el('span', { class: 'youth' }, el('a', { href: lib.youth.url, target: '_blank', rel: 'noopener', text: lib.youth.text })) : null),
      el('td', { 'data-label': 'Cost' }, costCell(lib)),
      el('td', { 'data-label': 'Sign up' },
        el('a', { class: 'apply', href: lib.signupUrl, target: '_blank', rel: 'noopener' }, 'Apply ', el('span', { 'aria-hidden': 'true' }, '→'), el('span', { class: 'sr-only', text: ` to ${lib.name}` })),
        el('a', { class: 'src rules', href: lib.source, target: '_blank', rel: 'noopener' }, 'the rules', el('span', { class: 'sr-only', text: ` at ${lib.name}` }))),
    );
  }

  // rank: 0 free for you, 1 paid online with ebooks, 2 youth card, 3 paid but in person or no ebooks
  function place(lib, st) {
    if (!st) {
      // No state picked: lead with the ones anybody can get.
      if (lib.paid && lib.paid.where === 'anyone' && lib.paid.online && lib.paid.digital) return { rank: 0, tag: 'Anyone, online' };
      if (lib.youth) return { rank: 1, tag: `Free anywhere, ages ${lib.youth.ages}` };
      return { rank: 2, tag: null };
    }
    if (lib.free.includes(st)) return { rank: 0, tag: 'Free for you' };
    if (paidOpenTo(lib, st) && lib.paid.online && lib.paid.digital) return { rank: 1, tag: `${feeText(lib.paid.fee)}, online` };
    if (lib.youth) return { rank: 2, tag: `Free if you're ${lib.youth.ages}` };
    if (paidOpenTo(lib, st)) return { rank: 3, tag: lib.paid.online ? feeText(lib.paid.fee) : `${feeText(lib.paid.fee)}, in person` };
    return { rank: 9, tag: null };
  }

  function sync() {
    const st = select.value;
    store.set('overdue-state', st);
    const placed = LIBRARIES.map((lib) => ({ lib, ...place(lib, st) }));
    const shown = placed.filter((p) => p.rank < 9);
    shown.sort((a, b) => a.rank - b.rank
      || (a.rank === 0 || a.rank === 1 ? (a.lib.paid?.fee ?? 0) - (b.lib.paid?.fee ?? 0) : 0)
      || (st ? 0 : STATES[a.lib.state].localeCompare(STATES[b.lib.state]))
      || a.lib.name.localeCompare(b.lib.name));
    const cap = !st && !libsExpanded ? shown.filter((p) => p.rank < 2).length : shown.length;
    body.replaceChildren(...shown.slice(0, cap).map((p) => row(p.lib, p.tag)));
    libMore.hidden = cap >= shown.length;
    libMore.textContent = `Show the other ${shown.length - cap}, free if you live in their state`;

    const online = LIBRARIES.filter((l) => l.paid && l.paid.where === 'anyone' && l.paid.online && l.paid.digital);
    const youth = LIBRARIES.filter((l) => l.youth);
    if (!st) {
      summary.replaceChildren(
        el('b', { text: `${LIBRARIES.length} library systems, all checked against their own rules pages. ` }),
        `${online.length} of them sell a card with ebooks to anyone in the US, online, and ${youth.length} have free cards for young people anywhere. Pick your state to sort them.`);
    } else {
      const free = placed.filter((p) => p.rank === 0).length;
      const paidOnline = placed.filter((p) => p.rank === 1).length;
      summary.replaceChildren(
        free
          ? el('b', { text: `${free} free for ${STATES[st]} residents. ` })
          : el('b', { text: `Nothing on this list is free statewide in ${STATES[st]}, but your local library still is. ` }),
        `${paidOnline} more you can buy online with ebooks included, and ${youth.length} free youth cards.`);
    }
  }
  note.textContent = 'Out-of-area cards mostly cover the digital side: ebooks, audiobooks and databases. Some perks, like NYC\'s Culture Pass and Boston\'s museum passes, need a physical card. Holds lists are per library too, so a second card means a second line for the same book, and sometimes a much shorter one.';
  select.addEventListener('change', sync);
  sync();
}

/* ---------- how to ---------- */

function renderHowTo() {
  const steps = $('#steps');
  for (const s of HOWTO) {
    steps.append(el('li', { class: 'step' },
      el('h3', { text: s.title }),
      el('p', { text: s.text }),
      s.list ? el('ul', {}, s.list.map((x) => el('li', { text: x }))) : null,
    ));
  }
  const tip = $('#student-tip');
  tip.append(
    el('span', { class: 'stamp stamp-blue', text: 'Students' }),
    el('p', {}, el('b', { text: STUDENT_TIP.lead }), ' ', STUDENT_TIP.text, ' ',
      ...STUDENT_TIP.examples.flatMap((x, i) => [
        el('a', { href: x.url, target: '_blank', rel: 'noopener', text: x.name }),
        i < STUDENT_TIP.examples.length - 1 ? ', ' : '.',
      ])),
  );
}

/* ---------- misc ---------- */

function initMeta() {
  $$('[data-checked]').forEach((n) => { n.textContent = `Last checked ${CHECKED_LABEL}.`; });
  $$('[data-checked-month]').forEach((n) => { n.textContent = CHECKED_LABEL; });
  const a = $('#foot-author');
  a.href = AUTHOR_URL;
  a.textContent = `Made by ${AUTHOR_NAME}`;
  $('#foot-source').href = REPO_URL;
  $('#foot-issues').href = `${REPO_URL}/issues`;
  if (GOATCOUNTER) {
    const s = document.createElement('script');
    s.async = true;
    s.src = '//gc.zgo.at/count.js';
    s.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`;
    document.body.append(s);
  }
}

initTheme();
initMeta();
renderHooks();
initCatalog();
initCalc();
initShare();
initLibraries();
renderHowTo();
