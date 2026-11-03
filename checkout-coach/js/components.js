// ---- Reusable UI pieces (match the Figma components) ----
const bar = a => `<nav class="bar">${[['Home','A1','🏠'],['Shop','B1','🛍️'],['Orders','A2','📦'],['Help','A4','💬']]
  .map(([l,t,i]) => `<button data-go="${t}" class="${a===l?'on':''}"><span aria-hidden="true">${i}</span>${l}</button>`).join('')}</nav>`;
const btn = (label, attrs, kind = 'primary') => `<button class="btn ${kind}" ${attrs}>${label}</button>`;
const TAGS = { req: ['Required','p-req'], opt: ['Optional','p-opt'], choice: ['Your choice','p-choice'] };
const coach = (step, total, tag, text, topic) => `<div class="coach"><div class="row"><b>Step ${step} of ${total}</b><span class="pill ${TAGS[tag][1]}">${TAGS[tag][0]}</span></div><p>${text}</p><button class="link" data-overlay="${topic}">What does this mean?</button></div>`;
const optCard = (key, val, title, price, detail, on) => `<button class="opt ${on?'on':''}" role="radio" aria-checked="${!!on}" data-act="pick" data-key="${key}" data-val="${val}"><span class="dot"></span><span class="txt"><b>${title}</b><small>${detail}</small></span><b class="price">${price}</b></button>`;
const checkRow = (key, label, on, extra = '', cls = '') => `<button class="check ${on?'on':''} ${cls}" role="checkbox" aria-checked="${!!on}" data-act="toggle" data-key="${key}"><span class="box">${on?'✓':''}</span><span>${label}</span><b>${extra}</b></button>`;
const avatar = (n, c) => `<div class="av" style="background:${c}" aria-hidden="true">${n[0]}</div>`;
const tile = (it, size = '') => `<div class="tile ${size}" style="background:${it.color}" aria-hidden="true">${it.emoji}</div>`;
const page = (body, o = {}) => `${o.banner ? `<div class="banner ${o.help?'help':''}">${o.banner}</div>` : ''}${o.back === false ? '' : '<div class="top"><button class="back" data-back aria-label="Go back">← Back</button></div>'}<main>${body}</main>${bar(o.nav)}`;

const HELP = {
  shipping: ['Where it goes', 'This is the address the store will send your package to. Check that the street and city are right. If they are, tap “Yes, send here.”'],
  delivery: ['How fast', 'Standard delivery is free but takes a few days longer. Express arrives sooner and costs extra. Either way, your package goes to the same address.'],
  protect: ['Protection plan', 'A protection plan is extra insurance if the item breaks after you buy it. Many people skip it. Your order works fine without it.'],
  payment: ['Paying', 'Choose the card you want to pay with. Nothing is charged yet. You will see the full price on the next screen before you pay. The store only keeps your card if you ask it to.'],
  gift: ['Gift choices', 'A gift receipt lets the person exchange the gift without seeing what you paid. Wrapping and a message are extras. You can skip them.'],
  safe: ['Safe to Pay check', 'This is your last look before paying. Make sure the price, card and delivery date are right.'],
  return: ['Return or cancel', 'To cancel, tap the order in My Orders within 1 hour of paying, then tap Cancel. To return an item after it arrives, open the order and tap Return.'],
  tip: ['Save this tip?', 'Show this tip next time you see gift options?']
};
