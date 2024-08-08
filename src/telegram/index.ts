import { Telegraf } from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from './constants';
import { handleMessage } from './events/message';
import { handleCommand } from './commands/index';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.on('message', handleMessage);
bot.command(Object.values(BOT_COMMANDS), handleCommand);

bot.launch().then(() => {
  console.log('Telegram bot started!');
});