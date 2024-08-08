import { Telegraf } from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from './constants';
import { handleMessage } from './events/message';
import { handleCommand } from './commands/index';
import { OpenAIService } from '../services/openai.service';

export const initBot = async () => {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
  const openAIService = new OpenAIService();

  bot.on('message', async (message) => {
    await handleMessage(message, openAIService);
  });

  bot.command(Object.values(BOT_COMMANDS), async (message, command) => {
    await handleCommand(message, command, openAIService);
  });

  bot.launch().then(() => {
    console.log('Telegram bot started!');
  });
};