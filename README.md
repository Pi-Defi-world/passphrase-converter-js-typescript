# Pi Network Passphrase Utility

A production-ready utility for converting BIP39 mnemonic phrases to Pi Network wallet addresses and secret keys.

## Files

- **`passphrase.ts`** - TypeScript version (for TypeScript projects)
- **`passphrase.js`** - JavaScript version (for direct Node.js usage)
- **`logger.ts`** - TypeScript logger utility
- **`logger.js`** - JavaScript logger utility
- **`example-usage.js`** - Usage examples

## Features

- ✅ **Automatic Case Normalization**: Converts any case input to lowercase
- ✅ **Address Validation**: Optional validation against expected wallet addresses
- ✅ **Pi Network Compatible**: Uses correct BIP44 path (`m/44'/314159'/0'`)
- ✅ **TypeScript Support**: Full TypeScript definitions
- ✅ **Error Handling**: Comprehensive error messages and suggestions

## Installation

```bash
npm install @stellar/stellar-sdk bip39 ed25519-hd-key dotenv
```

## Usage

### Basic Usage

```typescript
import { getKeypairFromMnemonic } from './passphrase.js';

// Generate keypair from mnemonic
const keypair = await getKeypairFromMnemonic("your twenty four word mnemonic phrase here");
console.log(`Wallet Address: ${keypair.publicKey()}`);
console.log(`Secret Key: ${keypair.secret()}`);
```

### With Address Validation

```typescript
import { getKeypairFromMnemonic } from './passphrase.js';

const expectedAddress = "GCAO7I2ZBIEFXNYD3KZFA3UXLMDVCYUG6CTCYG56746LZB5MIUFIIBJ5";
const keypair = await getKeypairFromMnemonic("your mnemonic phrase", expectedAddress);

if (keypair.publicKey() === expectedAddress) {
  console.log("✅ Address matches!");
} else {
  console.log("❌ Address mismatch - check your passphrase");
}
```

### Load from Secret Key

```typescript
import { getKeypairFromSecret } from './passphrase.js';

const keypair = getKeypairFromSecret("your_secret_key_here");
console.log(`Wallet Address: ${keypair.publicKey()}`);
```

## Configuration

The utility uses environment variables from `config/.env`:

```env
BIP44_PATH="m/44'/314159'/0'"
NETWORK=testnet
SERVER_URL=https://api.testnet.minepi.com
NETWORK_PASSPHRASE="Pi Testnet"
```

## Important Notes

- **Case Sensitivity**: Mnemonics are automatically normalized to lowercase
- **Pi Network**: Uses coin type 314159 for Pi Network
- **Testnet**: Configured for Pi Testnet by default
- **Security**: Never share your secret keys or mnemonic phrases

## Error Handling

The utility provides helpful error messages for common issues:

- Wrong word order
- Missing or extra words
- Typos in words
- Different passphrase than expected

## Example

See `example-usage.js` for complete usage examples.
