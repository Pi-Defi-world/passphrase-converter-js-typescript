// logger.js
// JavaScript version of the logger utility

import chalk from 'chalk';

const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (msg) => console.log(`${chalk.blue('[INFO]')} ${chalk.gray(getTimestamp())} → ${msg}`),

  success: (msg) => console.log(`${chalk.green('[SUCCESS]')} ${chalk.gray(getTimestamp())} → ${msg}`),

  warn: (msg) => console.log(`${chalk.yellow('[WARN]')} ${chalk.gray(getTimestamp())} → ${msg}`),

  error: (msg, err) => {
    console.log(`${chalk.red('[ERROR]')} ${chalk.gray(getTimestamp())} → ${msg}`);
    if (err) console.error(chalk.red(err));
  },

  divider: () => console.log(chalk.cyan('----------------------------------------')),
};
