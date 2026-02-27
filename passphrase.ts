import  StellarSdk from '@stellar/stellar-sdk';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { logger } from './logger/logger.js';
import env from './config/env.js';

/**
 * Normalizes a mnemonic phrase to lowercase and cleans up whitespace
 * @param mnemonic - The mnemonic phrase to normalize
 * @returns Normalized mnemonic phrase
 */
const normalizeMnemonic = (mnemonic: string): string => {
  return mnemonic.trim().toLowerCase().replace(/\s+/g, ' ');
};

/**
 * Generates a Pi Network keypair from a BIP39 mnemonic phrase
 * @param mnemonic - The BIP39 mnemonic phrase (will be normalized to lowercase)
 * @param expectedAddress - Optional expected wallet address for validation
 * @returns Promise<StellarSdk.Keypair> - The generated keypair
 */
export const getKeypairFromMnemonic = async (mnemonic: string, expectedAddress?: string): Promise<StellarSdk.Keypair> => {
  
  // Step 1: Normalize mnemonic format
  logger.info('🔍 Normalizing passphrase format...');
  
  const originalMnemonic = mnemonic;
  mnemonic = normalizeMnemonic(mnemonic);
  
  if (originalMnemonic !== mnemonic) {
    logger.info('📝 Passphrase normalized to lowercase');
    logger.info(`✅ Normalized passphrase: "${mnemonic}"`);
  } else {
    logger.success('✅ Passphrase format is already correct');
  }
  
  // Generate keypair using Pi Network BIP44 path
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const { key } = derivePath(env.BIP44_PATH, seed as any);
  const keypair = StellarSdk.Keypair.fromRawEd25519Seed(key);

  logger.success('✅ Derived keypair from mnemonic');
  logger.info(`Public Key: ${keypair.publicKey()}`);
  logger.info(`Secret Key: ${keypair.secret()}`);

  // Step 2: Validate against expected address if provided
  if (expectedAddress) {
    logger.info('🔍 Validating against expected wallet address...');
    if (keypair.publicKey() === expectedAddress) {
      logger.success('🎉 SUCCESS! Generated address matches your expected wallet address!');
    } else {
      logger.error('❌ MISMATCH! Generated address does not match expected address.');
      logger.info(`Expected: ${expectedAddress}`);
      logger.info(`Generated: ${keypair.publicKey()}`);
      logger.warn('💡 Please double-check your passphrase. Common issues:');
      logger.warn('   • Wrong word order');
      logger.warn('   • Missing or extra words');
      logger.warn('   • Typos in words');
      logger.warn('   • Different passphrase than expected');
    }
  } else {
    logger.info('💡 Tip: You can provide an expected address to validate the generated wallet');
  }

  return keypair;
};

/**
 * Creates a Pi Network keypair from an existing secret key
 * @param secret - The secret key string
 * @returns StellarSdk.Keypair - The keypair
 */
export const getKeypairFromSecret = (secret: string): StellarSdk.Keypair => {
  const keypair = StellarSdk.Keypair.fromSecret(secret);
  logger.info(`Loaded keypair from secret`);
  logger.info(`Public Key: ${keypair.publicKey()}`);
  return keypair;
};