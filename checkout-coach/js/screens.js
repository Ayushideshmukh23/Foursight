// ---- One function per Figma frame (A1…C18). Shared steps are reused by both flows. ----
const flowIs = f => S.flow === f;
const cartScreen = () => { const it = ITEMS[S.cart[0]];
  return page(it
    ? `<h1>Your cart</h1><div class="card row">${tile(it,'sm')}<div><b>${it.name}</b><br>${money(it.price)}</div></div>${btn('Check out with Coach','data-act="checkout"')}`
    : `<h1>Your cart is empty</h1>${btn('Keep shopping','data-go="B1"')}`, { banner: 'Coach is on', nav: 'Shop' }); };

const shipScreen = (total, elsewhere, yes) => page(
  coach(1, total, 'req', 'This is where your package will go.', 'shipping') +
  `<div class="card"><b>Robert’s address</b><br>${DEFAULT_SHIP.place}</div>` +
  btn('Yes, send here', `data-go="${yes}"`) + btn('Send somewhere else', `data-go="${elsewhere}"`, 'secondary'),
  { banner: 'Coach is on', nav: 'Shop' });

const payScreen = (step, total, next) => page(
  coach(step, total, 'req', 'Pick the card you want to pay with.', 'payment') +
  `<div class="opt on"><span class="dot"></span><span class="txt"><b>${CARD}</b><small>Your saved card</small></span></div>` +
  `<small>Your card won’t be saved unless you choose.</small>` +
  btn('Next', `data-go="${next}"`) + btn('Use a different card', 'data-go="B7"', 'secondary'),
  { banner: 'Coach is on', nav: 'Shop' });

const safeScreen = () => { const t = totals(), B = flowIs('B'), it = ITEMS[S.cart[0]] || {};
  const arrives = B ? (S.delivery === 'express' ? 'Thu, Nov 5' : 'Nov 9 – 11') : 'Nov 9 – 11';
  return page(`<h1>Safe to Pay check</h1>
  <div class="card"><div class="line"><span>${it.name}</span><span>${money(t.item)}</span></div>
  <div class="line"><span>Delivery</span><span>${t.ship ? money(t.ship) : 'Free'}</span></div>
  ${t.prot ? `<div class="line"><span>Protection plan</span><span>${money(t.prot)}</span></div>` : ''}
  ${t.wrap ? `<div class="line"><span>Gift wrap</span><span>${money(t.wrap)}</span></div>` : ''}
  <div class="line"><span>Tax (added by the state)</span><span>${money(t.tax)}</span></div>
  <div class="total"><span>Total</span><span>${money(t.total)}</span></div></div>
  <p><b>Paying with:</b> ${CARD}<br><b>Arrives:</b> ${arrives}<br><b>Ships to:</b> ${S.ship.name}, ${S.ship.place}</p>
  <p class="ver">✓ This is the real Maple &amp; Main<br>✓ You can cancel within 1 hour</p>
  ${btn('Pay ' + money(t.total), `data-act="pay" data-go="${B ? 'B9' : 'C18'}"`)}
  ${btn('Change something', `data-go="${B ? 'B4' : 'C9'}"`, 'secondary')}`, { banner: 'Coach is on', nav: 'Shop' }); };

const bagGrid = list => `<div class="grid">${list.map(b => `<button class="prod" data-go="C4/${b.id}">${tile(ITEMS[b.id])}<b>${b.name}</b><span>${money(b.price)}</span></button>`).join('')}</div>`;
const under30 = BAGS.filter(b => b.price < 30);

const giftScreen = mode => page(
  coach(2, 3, 'choice', 'These choices are up to you.', 'gift') +
  checkRow('receipt', 'Gift receipt (no prices shown)', S.receipt, '', mode === 'help' ? 'hl' : '') +
  checkRow('wrap', 'Gift wrap', S.wrap, '+$5') +
  checkRow('note', 'Gift message', S.note) +
  (mode === 'help' ? `<div class="note"><b>${S.helper}’s note</b><p>Pick gift receipt so Emma can exchange it without seeing the price. Wrap costs extra, you can skip it.</p></div>${btn('End help','data-act="endHelp"')}` : '') +
  (mode === 'done' && S.tipSaved ? `<span class="chip">${S.helper}’s tip</span>` : '') +
  (mode !== 'help' ? btn('Next', 'data-go="C16"') : '') +
  (mode === 'plain' ? btn('Ask family to explain', 'data-go="C10"', 'secondary') : ''),
  mode === 'help' ? { banner: `${S.helper} can point, but only you can tap`, help: 1, nav: 'Shop' } : { banner: 'Coach is on', nav: 'Shop' });

const SCREENS = {
// ---------- A: Home & Orders ----------
A1: () => { const t = S.orders.find(o => o.id === 'toaster');
  return page(`<h1>Hi Robert</h1>
  <button class="card" data-go="A3/toaster"><b>Your toaster shipped</b><span>Arrives ${t.arrives.replace('Fri, ','Fri, ')}</span></button>
  ${btn('Shop at Maple &amp; Main','data-go="B1"')}${btn('My Orders','data-go="A2"','secondary')}${btn('Family Helpers','data-go="A4"','secondary')}`, { back: false, nav: 'Home' }); },
A2: () => page(`<h1>My Orders</h1>${S.orders.map(o => `<button class="card ${o.old ? 'old' : ''}" data-go="A3/${o.id}"><b>${o.name}</b><span>${o.status}${o.arrives && !o.old ? ' · arrives ' + o.arrives : ''}</span></button>`).join('')}`, { nav: 'Orders' }),
A3: id => { const o = S.orders.find(x => x.id === id) || S.orders[0];
  return page(`<div class="ok" aria-hidden="true">✓</div><h1>Your order went through</h1><div class="facts">
  <p><b>Item</b>${o.name}${/^\d{3}[A-Z]$/.test(o.id) ? ' (order ' + o.id + ')' : ''}</p>
  ${o.shipped ? `<p><b>Shipped</b>${o.shipped}</p>` : ''}${o.arrives ? `<p><b>Arrives</b>${o.arrives}</p>` : `<p><b>Status</b>${o.status}</p>`}
  <p><b>Paid</b>${o.paid} with ${o.card}</p></div>
  <p class="ver">✓ Maple &amp; Main is a verified store</p>${btn('How to return or cancel','data-overlay="return"','secondary')}`, { nav: 'Orders' }); },
A4: () => page(`<h1>Family Helpers</h1>
  <div class="card row">${avatar('Lisa','#7A4E9E')}<div><b>Lisa</b><span>Daughter</span></div></div>
  <div class="card row">${avatar('Mark','#2E7D4F')}<div><b>Mark</b><span>Son</span></div></div>
  <h2>Saved tips (${S.tips.length})</h2>${S.tips.map(t => `<div class="note">${t}</div>`).join('')}`, { nav: 'Help' }),

// ---------- B: Coffee checkout ----------
B1: () => { const n = S.cart.length;
  return page(`<div class="storehead"><div class="logo"><i>M</i><span>Maple &amp; Main</span></div>
  <button class="cart" data-go="B2" aria-label="Cart, ${n} items">🛒${n ? `<em>${n}</em>` : ''}</button></div>
  <button class="search" data-go="C1">🔍 Search the store</button>
  <h2>Shop by kind</h2>
  <div class="cats"><button data-act="soon">Kitchen</button><button data-go="C3">Gifts</button><button data-act="soon">Home</button></div>
  ${n ? '' : `<div class="card row">${tile(ITEMS.coffee,'sm')}<div><b>Coffee maker</b><br>$50</div></div>${btn('Add to cart','data-act="addCoffee" data-go="B2"')}`}`,
  { banner: 'Coach is on', nav: 'Shop', back: false }); },
B2: cartScreen,
B3: () => shipScreen(4, 'C8', 'B4'),
B4: () => page(coach(2, 4, 'choice', 'Pick how fast. Faster costs more.', 'delivery') +
  optCard('delivery', 'free', 'Free standard', 'Free', 'Arrives Nov 9 – 11', S.delivery === 'free') +
  optCard('delivery', 'express', 'Express', '$10', 'Arrives Thu, Nov 5', S.delivery === 'express') +
  btn('Next', 'data-go="B5"'), { banner: 'Coach is on', nav: 'Shop' }),
B5: () => page(coach(3, 4, 'opt', 'You do NOT need this to finish your order.', 'protect') +
  `<p>A protection plan covers repairs if the coffee maker breaks.</p>` +
  btn('Skip', 'data-act="protect" data-val="0" data-go="B6"') +
  `<button class="linkbtn" data-act="protect" data-val="1" data-go="B6">Add for $8</button>`, { banner: 'Coach is on', nav: 'Shop' }),
B6: () => payScreen(4, 4, 'B8'),
B7: () => page(`<h1>New card</h1>
  <div><label for="cn">Card number</label><input id="cn" value="4111 1111 1111 1234" inputmode="numeric"></div>
  <div><label for="ce">Expires</label><input id="ce" value="08 / 29"></div>
  <div><label for="cs">Security code (3 digits on the back)</label><input id="cs" value="123"></div>
  ${checkRow('dontSave', 'Don’t save this card', S.dontSave)}
  ${btn('Continue', `data-act="newCard" data-go="${flowIs('B') ? 'B8' : 'C17'}"`)}`, { banner: 'Coach is on', nav: 'Shop' }),
B8: safeScreen,
B9: () => { const id = S.last || '123A';
  return page(`<div class="ok" aria-hidden="true">✓</div><h1>You finished this yourself!</h1><p>Your order number is ${id}. We will email you when it ships.</p>${btn('See it in My Orders','data-go="A2"')}`, { back: false, nav: 'Orders' }); },

// ---------- C: Gift for Emma ----------
C1: () => page(`<div class="search">🔍 handbag</div><div class="chips"><button data-go="C2">Under $30</button><button data-go="C3">Gifts</button></div>${bagGrid(BAGS)}`, { banner: 'Coach is on', nav: 'Shop' }),
C2: () => page(`<h1>Bags under $30</h1>${bagGrid(under30)}`, { banner: 'Coach is on', nav: 'Shop' }),
C3: () => page(`<h1>Gifts › Bags</h1>${bagGrid(under30)}`, { banner: 'Coach is on', nav: 'Shop' }),
C4: id => { const b = BAGS.find(x => x.id === id) || BAGS[0];
  return page(`${tile(ITEMS[b.id], 'big')}<h1>${b.name}</h1><div class="price"><b>${money(b.price)}</b></div>
  <p><b>What buyers say, in plain words:</b> ${b.says}.</p><p>★ 4.6 from 212 buyers</p>
  ${btn('Add to cart', `data-act="addBag" data-val="${b.id}" data-go="C5"`)}`, { banner: 'Coach is on', nav: 'Shop' }); },
C5: cartScreen,
C6: () => shipScreen(3, 'C7', 'C9'),
C7: () => page(`<h1>Who is it going to?</h1>
  <button class="card row" data-act="shipEmma" data-go="C9">${avatar('Emma','#C0612B')}<div><b>Emma (granddaughter)</b><span>456 Real St</span></div></button>
  ${btn('Add a new address', 'data-go="C8"', 'secondary')}`, { banner: 'Coach is on', nav: 'Shop' }),
C8: () => { const g = flowIs('C');
  return page(`<h1>Where should it go?</h1>
  <div><label for="an">Name</label><input id="an" value="${g ? 'Emma' : 'Robert'}"></div>
  <div><label for="ap">Street and city</label><input id="ap" value="${g ? '456 Real St' : '789 Real St'}"></div>
  ${btn('Save', `data-act="saveAddr" data-go="${g ? 'C9' : 'B4'}"`)}`, { banner: 'Coach is on', nav: 'Shop' }); },
C9: () => giftScreen('plain'),
C10: () => page(`<h1>Who can explain this?</h1>${[['Lisa','Daughter','#7A4E9E'],['Mark','Son','#2E7D4F']].map(([n, r, c]) =>
  `<div class="card helper"><div class="row">${avatar(n, c)}<div><b>${n}</b><span>${r}</span></div></div>
  <div class="btns">${btn('Call', `data-act="helper" data-val="${n}" data-go="C11"`)}${btn('Send a link', `data-act="helper" data-val="${n}" data-go="C12"`, 'secondary')}</div></div>`).join('')}`, { banner: 'Coach is on', nav: 'Shop' }),
C11: () => page(`${avatar(S.helper, S.helper === 'Lisa' ? '#7A4E9E' : '#2E7D4F')}<h1>Calling ${S.helper}…</h1>`, { back: false, nav: 'Shop' }).replace('<main>', '<main class="big-center">'),
C12: () => page(`<h1>Link sent</h1><p>We texted ${S.helper} a link. Waiting for ${S.helper} to join…</p>`, { back: false, nav: 'Shop' }).replace('<main>', '<main class="big-center">'),
C13: () => giftScreen('help'),
C15: () => giftScreen('done'),
C16: () => payScreen(3, 3, 'C17'),
C17: safeScreen,
C18: () => page(`<div class="ok" aria-hidden="true">✓</div><h1>Gift on its way to Emma!</h1>${S.tipSaved ? `<p>${S.helper}’s tip is saved for next time.</p>` : ''}${btn('See it in My Orders','data-go="A2"')}`, { back: false, nav: 'Orders' })
};
