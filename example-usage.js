import { getKeypairFromMnemonic } from './passphrase.js';

const MNEMONIC = process.env.MNEMONIC;

if (!MNEMONIC) {
  console.error('Please set MNEMONIC in your environment or config/.env before running this script.');
  process.exit(1);
}

const run = async () => {
  const keypair = await getKeypairFromMnemonic(MNEMONIC);
  console.log('Wallet Address:', keypair.publicKey());
  console.log('Secret Key:', keypair.secret());
};

run().catch((err) => {
  console.error('Error generating keypair from mnemonic:', err);
  process.exit(1);
});

