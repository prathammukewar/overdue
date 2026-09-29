// Draws the share image and handles copy / download / native share.
import { money } from './calc.js';

const W = 1200;
const H = 630;
const C = {
  paper: '#f3ead5',
  card: '#fffcf3',
  ink: '#1d1a14',
  ink3: '#62594a',
  red: '#b3261e',
  blue: '#1d4d97',
  rule: 'rgba(29, 77, 151, 0.14)',
  margin: 'rgba(179, 38, 30, 0.5)',
};

// Small seeded PRNG so the ink wear looks the same every time.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function font(ctx, spec, stretch = 'normal') {
  ctx.font = spec;
  if ('fontStretch' in ctx) ctx.fontStretch = stretch;
}

function fitFont(ctx, text, weight, maxSize, maxWidth, family, stretch) {
  let size = maxSize;
  for (; size > 20; size -= 2) {
    font(ctx, `${weight} ${size}px ${family}`, stretch);
    if (ctx.measureText(text).width <= maxWidth) break;
  }
  return size;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Knock little specks out of whatever was drawn inside the box, like a worn stamp.
function wear(ctx, x, y, w, h, seed, amount = 260) {
  const r = rng(seed);
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < amount; i++) {
    const px = x + r() * w;
    const py = y + r() * h;
    const rad = 0.6 + r() * r() * 3.2;
    ctx.globalAlpha = 0.35 + r() * 0.65;
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawShareCard(canvas, { total, top, more = 0, url }) {
  const ctx = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = H;
  const sans = 'Archivo, "Arial Narrow", Arial, sans-serif';
  const mono = '"Courier Prime", "Courier New", monospace';

  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, W, H);

  // the index card
  ctx.save();
  ctx.shadowColor = 'rgba(60, 40, 10, 0.28)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = C.card;
  ctx.fillRect(36, 34, W - 72, H - 68);
  ctx.restore();

  // blue rules and the red header line
  ctx.fillStyle = C.rule;
  for (let y = 170; y < H - 90; y += 48) ctx.fillRect(36, y, W - 72, 2);
  ctx.fillStyle = C.margin;
  ctx.fillRect(36, 116, W - 72, 3);

  // header
  ctx.fillStyle = C.ink3;
  font(ctx, `700 26px ${mono}`);
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('DATE DUE: RIGHT NOW', 78, 92);

  // brand stamp, top right
  ctx.save();
  ctx.translate(W - 200, 76);
  ctx.rotate(-0.07);
  ctx.strokeStyle = C.red;
  ctx.fillStyle = C.red;
  ctx.lineWidth = 4;
  font(ctx, `900 34px ${sans}`, 'condensed');
  const bw = ctx.measureText('OVERDUE').width;
  roundRect(ctx, -bw / 2 - 14, -26, bw + 28, 46, 6);
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.fillText('OVERDUE', 0, 10);
  wear(ctx, -bw / 2 - 20, -32, bw + 40, 58, 11, 90);
  ctx.restore();

  // lead line
  ctx.textAlign = 'left';
  ctx.fillStyle = C.ink;
  font(ctx, `800 46px ${sans}`, 'semi-condensed');
  ctx.fillText('My library card is worth', 78, 200);

  // the big number and "a year", stamped together
  const amount = money(total, { whole: true });
  const size = fitFont(ctx, amount, 900, 200, 540, sans, 'extra-condensed');
  const numW = ctx.measureText(amount).width;
  const boxW = Math.max(numW + 64, 300);
  const boxH = size * 0.9 + 92;
  ctx.save();
  ctx.translate(92, 236);
  ctx.rotate(-0.05);
  ctx.strokeStyle = C.red;
  ctx.fillStyle = C.red;
  ctx.lineWidth = 9;
  roundRect(ctx, 0, 0, boxW, boxH, 14);
  ctx.stroke();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  font(ctx, `900 ${size}px ${sans}`, 'extra-condensed');
  ctx.fillText(amount, boxW / 2, 10 + size * 0.84);
  font(ctx, `900 44px ${sans}`, 'condensed');
  if ('letterSpacing' in ctx) ctx.letterSpacing = '8px';
  ctx.fillText('A YEAR', boxW / 2 + 4, boxH - 22);
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
  wear(ctx, -8, -8, boxW + 16, boxH + 16, 7, 560);
  ctx.restore();
  ctx.textAlign = 'left';

  // the top lines, typewritten on the rules
  const colX = 742;
  const colR = W - 84;
  ctx.fillStyle = C.ink3;
  font(ctx, `700 22px ${mono}`);
  ctx.fillText('THE BIG ONES', colX, 202);
  let y = 302;
  for (const t of top.slice(0, 3)) {
    ctx.fillStyle = C.ink;
    font(ctx, `700 28px ${mono}`);
    let label = t.line.label;
    while (ctx.measureText(label).width > colR - colX - 110 && label.length > 4) label = label.slice(0, -2) + '.';
    ctx.textAlign = 'left';
    ctx.fillText(label, colX, y - 12);
    ctx.textAlign = 'right';
    ctx.fillStyle = C.red;
    ctx.fillText(money(t.value, { whole: true }), colR, y - 12);
    y += 48;
  }
  if (top.length === 0) {
    ctx.fillStyle = C.ink3;
    font(ctx, `400 26px ${mono}`);
    ctx.fillText('Nothing ticked yet.', colX, y - 12);
  } else if (more > 0) {
    ctx.textAlign = 'left';
    ctx.fillStyle = C.ink3;
    font(ctx, `400 26px ${mono}`);
    ctx.fillText(`+ ${more} more thing${more === 1 ? '' : 's'}`, colX, y - 12);
  }

  // footer strip: the URL and the question
  ctx.textAlign = 'left';
  ctx.fillStyle = C.blue;
  font(ctx, `700 28px ${mono}`);
  const shortUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  ctx.fillText(shortUrl, 78, 574);
  ctx.textAlign = 'right';
  ctx.fillStyle = C.ink;
  font(ctx, `900 34px ${sans}`, 'condensed');
  ctx.fillText("WHAT'S YOURS WORTH?", W - 84, 574);
  ctx.textAlign = 'left';
}

export function canvasBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not make the image'))), 'image/png');
  });
}

export async function copyImage(canvas) {
  if (!navigator.clipboard || typeof window.ClipboardItem === 'undefined') {
    throw new Error('unsupported');
  }
  // Pass the promise straight in so Safari keeps the click as the user gesture.
  const item = new ClipboardItem({ 'image/png': canvasBlob(canvas) });
  await navigator.clipboard.write([item]);
}

export async function downloadImage(canvas, filename) {
  const blob = await canvasBlob(canvas);
  const a = document.createElement('a');
  const href = URL.createObjectURL(blob);
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 4000);
}

export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand('copy');
  ta.remove();
  if (!ok) throw new Error('copy failed');
}
