// ---- Shared data + app state. Edit hardcoded data here. ----
const money = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
const CARD = 'Visa ••1234';
const TAX = 0.10; // whole-dollar tax to keep prices simple
const DEFAULT_SHIP = { name: 'Robert', place: '123 Real St' };

const BAGS = [
  { id: 'tan',   name: 'Tan crossbody bag',    price: 20, color: '#D9B98F', says: 'sturdy, color matches photo, good gift' },
  { id: 'black', name: 'Black tote',           price: 15, color: '#3B4650', says: 'roomy, easy to clean, comfortable straps' },
  { id: 'red',   name: 'Red mini bag',         price: 10, color: '#C9533B', says: 'small but holds a phone, bright color' },
  { id: 'sage',  name: 'Sage green pouch bag', price: 25, color: '#9DB59E', says: 'light, zipper works well, nice size' },
  { id: 'navy',  name: 'Navy shoulder bag',    price: 40, color: '#35507A', says: 'looks nicer than the price, holds a lot' },
  { id: 'cream', name: 'Cream leather purse',  price: 45, color: '#EADFCB', says: 'soft leather, shows dirt a little' },
  { id: 'brown', name: 'Brown satchel',        price: 50, color: '#8A5A3C', says: 'heavy duty, feels like it will last' },
  { id: 'plum',  name: 'Plum travel bag',      price: 65, color: '#6B3E5E', says: 'great size for trips, a bit heavy' }
];
const ITEMS = { coffee: { name: 'Coffee maker', price: 50, emoji: '☕', color: '#E8DCCB' } };
BAGS.forEach(b => ITEMS[b.id] = { name: b.name, price: b.price, emoji: '👜', color: b.color });

const fresh = () => ({
  flow: 'B', cart: ['coffee'], delivery: 'free', protect: false,
  newCard: false, dontSave: true, receipt: false, wrap: false, note: false,
  helper: 'Lisa', tipSaved: false, overlay: null, ship: { ...DEFAULT_SHIP },
  tips: ['Check the delivery date before you pay.', 'Never read your card number to someone who calls you.'],
  orders: [
    { id: 'toaster', name: 'Toaster', status: 'Shipped', shipped: 'Fri, Oct 30', arrives: 'Fri, Nov 6', paid: '$30', card: CARD },
    { id: 'kettle', name: 'Kettle', status: 'Delivered Sep 12', old: 1, paid: '$25', card: CARD },
    { id: 'towels', name: 'Dish towels', status: 'Delivered Aug 3', old: 1, paid: '$15', card: CARD }
  ]
});
let S = fresh();

function totals() {
  const it = ITEMS[S.cart[0]] || { price: 0 };
  const B = S.flow === 'B', C = S.flow === 'C';
  const item = it.price, ship = B && S.delivery === 'express' ? 10 : 0;
  const prot = B && S.protect ? 8 : 0, wrap = C && S.wrap ? 5 : 0;
  const tax = Math.round(item * TAX);
  return { item, ship, prot, wrap, tax, total: item + ship + prot + wrap + tax };
}
