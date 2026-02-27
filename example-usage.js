import { getKeypairFromMnemonic, getKeypairFromSecret } from './passphrase.js';
import * as bip39 from 'bip39';

const MNEMONIC = process.env.MNEMONIC;

if (!MNEMONIC) {
  console.error('Please set MNEMONIC in your environment or config/.env before running this script.');
  process.exit(1);
}

const run = async () => {
  // Forward: mnemonic -> keypair (address + secret)
  const keypair = await getKeypairFromMnemonic(MNEMONIC);
  console.log('Wallet Address:', keypair.publicKey());
  console.log('Secret Key:', keypair.secret());

  // Reverse (key validation): secret -> keypair, should match original public key
  const secret = keypair.secret();
  const fromSecret = getKeypairFromSecret(secret);
  console.log('Reverse (from secret) public key:', fromSecret.publicKey());
  console.log(
    'Secret roundtrip validation (public key match):',
    fromSecret.publicKey() === keypair.publicKey() ? 'PASS ✅' : 'FAIL ❌'
  );

  // BIP39 roundtrip: mnemonic -> entropy -> mnemonic (checks normalization only)
  const normalizedMnemonic = MNEMONIC.trim().toLowerCase().replace(/\s+/g, ' ');
  const entropy = bip39.mnemonicToEntropy(normalizedMnemonic);
  const roundtripMnemonic = bip39.entropyToMnemonic(entropy);

  console.log('Roundtrip mnemonic (BIP39 entropy check):', roundtripMnemonic);
  console.log(
    'Mnemonic roundtrip validation:',
    roundtripMnemonic === normalizedMnemonic ? 'PASS ✅' : 'FAIL ❌'
  );
};

run().catch((err) => {
  console.error('Error generating keypair from mnemonic:', err);
  process.exit(1);
});

