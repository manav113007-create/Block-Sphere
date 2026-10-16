const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile menu
const burger = $('.burger'), menu = $('#menu');
burger.onclick = () => burger.setAttribute('aria-expanded', menu.classList.toggle('open'));
menu.onclick = e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } };

// ---- Key concepts: one small interaction per idea ----
let timer;
const rand = () => '0x' + Math.random().toString(16).slice(2, 8);
const concepts = {
  decentralization: ['Decentralization',
    'Thousands of independent computers each keep a full copy of the ledger. With no central server, there is nothing single to hack, censor or switch off.',
    d => {
      d.innerHTML = '<div class="nodes">' + [1, 2, 3, 4, 5].map(n => `<button class="node">${n}</button>`).join('') + '</div><p class="out"></p><small>Tap a computer to take it offline.</small>';
      const upd = () => { const on = $$('.node:not(.off)', d).length;
        $('.out', d).textContent = on ? `${on} of 5 computers online. The ledger is still available.` : 'Every copy is offline, so the ledger is gone. This is why real networks run thousands of nodes.'; };
      $('.nodes', d).onclick = e => { if (e.target.matches('.node')) { e.target.classList.toggle('off'); upd(); } };
      upd();
    }],
  transparency: ['Transparency',
    'Every transaction is public and permanent. Anyone can audit the ledger, yet people appear only as addresses, not names.',
    d => {
      d.innerHTML = '<ul class="ledger"></ul><small>New entries appear as they are confirmed.</small>';
      const ul = $('.ledger', d), add = () => {
        ul.insertAdjacentHTML('afterbegin', `<li>${rand()} sent ${(Math.random() * 5).toFixed(2)} coins to ${rand()}</li>`);
        if (ul.children.length > 5) ul.lastChild.remove(); };
      for (let i = 0; i < 4; i++) add();
      timer = setInterval(add, 1600);
    }],
  contracts: ['Smart contracts',
    'A smart contract is a small program stored on the blockchain. It runs exactly as written, so no clerk has to approve the deal. This one rents out a bike.',
    d => {
      d.innerHTML = '<code>if payment ≥ 1 coin → unlock bike 12</code><div class="ctas"><button class="btn sm" data-p="0.5">Pay 0.5 coin</button><button class="btn sm" data-p="1">Pay 1 coin</button></div><p class="out">Waiting for a payment.</p>';
      d.onclick = e => { const p = e.target.dataset.p; if (p) $('.out', d).textContent = p >= 1
        ? 'Condition met. Bike 12 is unlocked, with no clerk and no approval.' : 'Condition not met. The lock stays closed and the coins go back.'; };
    }],
  web3: ['Web3',
    'Web3 is the internet rebuilt on blockchains. Instead of an account owned by a company, you hold a wallet that proves who you are and what you own.',
    d => {
      const text = ['Your account and data sit on a company’s servers. They set the rules and can lock you out.',
        'Your wallet is your login and your vault. You hold the key, and apps ask permission to use it.'];
      d.innerHTML = '<div class="switch"><button class="on">Web2</button><button>Web3</button></div><p class="out"></p>';
      const bs = $$('button', d), show = i => { bs.forEach((b, j) => b.classList.toggle('on', i === j)); $('.out', d).textContent = text[i]; };
      bs.forEach((b, i) => b.onclick = () => show(i)); show(0);
    }]
};
function openTab(k) {
  clearInterval(timer);
  $$('.tabs button').forEach(b => b.setAttribute('aria-selected', b.dataset.k === k));
  const [title, text, init] = concepts[k];
  $('#panel').innerHTML = `<h3>${title}</h3><p>${text}</p><div class="demo"></div>`;
  init($('.demo', $('#panel')));
}
$('.tabs').onclick = e => { if (e.target.dataset.k) openTab(e.target.dataset.k); };
openTab('decentralization');
