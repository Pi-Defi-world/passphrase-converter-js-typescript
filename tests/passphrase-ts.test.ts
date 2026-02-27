import test from 'node:test';
import assert from 'node:assert/strict';

import { getKeypairFromMnemonic, getKeypairFromSecret } from '../passphrase.js';

const MNEMONIC =
  ' ';

function silenceConsole() {
  const original = { log: console.log, error: console.error };
  console.log = () => {};
  console.error = () => {};
  return () => {
    console.log = original.log;
    console.error = original.error;
  };
}

test('TS: mnemonic normalization is deterministic', async () => {
  const restore = silenceConsole();
  try {
    const kp1 = await getKeypairFromMnemonic(MNEMONIC);
    const kp2 = await getKeypairFromMnemonic(`  ${MNEMONIC.toUpperCase().replaceAll(' ', '   ')}  `);

    assert.equal(kp1.publicKey(), kp2.publicKey());
    assert.equal(kp1.secret(), kp2.secret());
    assert.match(kp1.publicKey(), /^G[A-Z2-7]{55}$/);
    assert.match(kp1.secret(), /^S[A-Z2-7]{55}$/);
  } finally {
    restore();
  }
});

test('TS: secret key roundtrip matches public key', async () => {
  const restore = silenceConsole();
  try {
    const kp = await getKeypairFromMnemonic(MNEMONIC);
    const kp2 = getKeypairFromSecret(kp.secret());
    assert.equal(kp.publicKey(), kp2.publicKey());
  } finally {
    restore();
  }
});
