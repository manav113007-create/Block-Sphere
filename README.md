# BlockSphere

A beginner-friendly landing page that teaches blockchain by letting you break one. Built for the Blockchain RBU Chapter.

**Live site:** _add your deployed link here_

## Tech stack
HTML, CSS and vanilla JavaScript, plus **React 18** for the interactive blockchain lab only, bundled with **Vite**. The Bricolage Grotesque font comes from Google Fonts.

## Run it
```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
```

## Deploy (Vercel or Netlify)
Push the repo to GitHub, import it on Vercel or Netlify, and accept the detected settings: build command `npm run build`, output directory `dist`. Every `git push` then redeploys automatically.

## Files
- `index.html`: structure and copy
- `style.css`: design tokens, layout, animations, responsive rules
- `lab.jsx`: React component for the blockchain lab
- `script.js`: menu and the key-concept demos (vanilla JS)

## How it works
- **Blockchain lab (React):** the blocks live in state and the hashes are derived from them, so editing any block recomputes the whole chain. Each block's hash is a real SHA-256 of its index, previous hash, text and nonce (`crypto.subtle`). A block is valid if its hash starts with `00`. Mining increases the nonce until that happens. Editing a block changes its hash, which changes the next block's "previous" value, so the break cascades.
- **Hero animation:** pure CSS. Blocks drop in with staggered delays, then connectors grow. The dashed fourth block blinks to show mining.
- **Key concepts:** one tiny interaction per idea (take nodes offline, watch a public ledger, trigger a contract, flip Web2/Web3). The panel is rendered from one `concepts` object.
- **Real uses:** native `<details>` elements, so the accordion needs no JavaScript.
- **Accessibility:** visible focus rings, `aria-live` status text, and `prefers-reduced-motion` support.

## Design choices
- Cool grey paper, deep ink and cobalt blue, with yellow as the "seal" colour. Green and red are reserved for valid and broken, so colour always means something.
- Chunky blocks with hard shadows echo physical building blocks, which suits the topic.
- One memorable thing (the lab), kept quiet everywhere else. No scroll-fade effects.
- Use cases are real, named examples instead of generic icon cards.

## AI tools used
Claude drafted the code and ideas, ChatGPT was used for review, and I  tested, adjusted, extended, created new things , improvised extensively and made it and lastly deployed it.
## Bonus features
Basic Cards
animation on blocks 
Dyanmic look 

