
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

async function hash(text) {
  const bytes = new TextEncoder().encode(text);
  const result = await crypto.subtle.digest('SHA-256', bytes);

  return [...new Uint8Array(result)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const startHash = '0'.repeat(64);

async function mine(data, previous) {
  let nonce = 0;
  let result;

  do {
    result = await hash(data + previous + nonce++);
  } while (!result.startsWith('00'));

  return { nonce: nonce - 1, hash: result };
}

function Lab() {
  const [data, setData] = useState('Rahul passed his exam');
  const [original, setOriginal] = useState('');
  const [nonce, setNonce] = useState(0);
  const [savedHash, setSavedHash] = useState('');
  const [currentHash, setCurrentHash] = useState('');
  const [loading, setLoading] = useState(false);

  async function check() {
    setCurrentHash(await hash(data + startHash + nonce));
  }

  async function mineBlock() {
    setLoading(true);

    const result = await mine(data, startHash);

    setOriginal(data);
    setNonce(result.nonce);
    setSavedHash(result.hash);
    setCurrentHash(result.hash);

    setLoading(false);
  }

  const changed = savedHash && currentHash && savedHash !== currentHash;

  return (
    <div className="chain">
      <article className={'blk' + (changed ? ' bad' : '')}>
        <header>
          <h3>Block 1</h3>
          <span className="badge">
            {changed ? 'Changed' : savedHash ? 'Valid' : 'Not mined'}
          </span>
        </header>

        <label>
          Message
          <input
            value={data}
            onChange={e => {
              setData(e.target.value);
              setCurrentHash('');
            }}
          />
        </label>

        <dl>
          <dt>Previous hash</dt>
          <dd>{startHash.slice(0, 12)}...</dd>

          <dt>Nonce</dt>
          <dd>{nonce}</dd>

          <dt>Hash</dt>
          <dd>{currentHash.slice(0, 16) || 'Not calculated yet'}</dd>
        </dl>

        <button className="btn sm" onClick={mineBlock} disabled={loading}>
          {loading ? 'Mining...' : 'Mine block'}
        </button>

        <button className="btn sm" onClick={check}>
          Check changes
        </button>
      </article>

      {/* Simple change display */}
      {original && (
        <p className="status" aria-live="polite">
          <strong>Original:</strong> {original}<br />
          <strong>Current:</strong> {data}<br />
          <strong>Result:</strong>{' '}
          {changed
            ? 'The hash has changed. Mine the block again.'
            : data === original
              ? 'No message changes detected.'
              : 'Check the hash to see the change.'}
        </p>
      )}

      {!original && (
        <p className="status">
          Edit the message, mine the block, and see how its hash changes.
        </p>
      )}
    </div>
  );
}

createRoot(document.getElementById('lab-root')).render(<Lab />);
