import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

export default {
  BIP44_PATH: process.env.BIP44_PATH || "m/44'/314159'/0'",
  NETWORK: process.env.NETWORK || 'testnet',
  SERVER_URL: process.env.SERVER_URL || 'https://api.testnet.minepi.com',
  NETWORK_PASSPHRASE: process.env.NETWORK_PASSPHRASE || 'Pi Testnet',
  HORIZON_URL: process.env.HORIZON_URL || 'https://api.testnet.minepi.com',
};
