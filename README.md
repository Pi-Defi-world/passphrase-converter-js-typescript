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
pnpm install 
```

## Installation 
add the passphrase to the env file