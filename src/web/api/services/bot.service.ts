import { PrismaClient } from '@prisma/client';
import { logger } from '../../../utils/logger';
import { TelegramBot } from '../../../telegram/utils/bot';
import { TELEGRAM_BOT_TOKEN } from '../../../telegram/constants';

const prisma = new PrismaClient();

let bot: TelegramBot | null = null;

export const getBotStatus = async () => {
  if (bot) {
    return {
      status: 'running',
      chatId: bot.bot.context.chatId,
    };
  } else {
    return {
      status: 'stopped',
    };
  }
};

export const startBot = async () => {
  if (bot) {
    return;
  }

  try {
    bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
    await bot.initBot();
    logger.info('Telegram bot started successfully.');
  } catch (error) {
    logger.error('Error starting bot:', error);
    throw new Error('Failed to start the bot.');
  }
};

export const stopBot = async () => {
  if (!bot) {
    return;
  }

  try {
    await bot.stopBot();
    bot = null;
    logger.info('Telegram bot stopped successfully.');
  } catch (error) {
    logger.error('Error stopping bot:', error);
    throw new Error('Failed to stop the bot.');
  }
};

export const sendBotMessage = async (message: string, chatId: number) => {
  if (!bot) {
    throw new Error('Bot is not running.');
  }

  try {
    await bot.sendMessage(chatId, message);
    logger.info(`Message sent successfully to chatId: ${chatId}`);
  } catch (error) {
    logger.error('Error sending bot message:', error);
    throw new Error('Failed to send the bot message.');
  }
};

export const getBotMessages = async () => {
  if (!bot) {
    throw new Error('Bot is not running.');
  }

  try {
    const messages = await prisma.message.findMany();
    return messages;
  } catch (error) {
    logger.error('Error getting bot messages:', error);
    throw new Error('Failed to get bot messages.');
  }
};

export const updateBotSettings = async (settings: any) => {
  // Implement logic to update bot settings based on the provided `settings` object.
  // You can use Prisma to update the bot settings in the database.
  // Example:
  // try {
  //   await prisma.botSetting.update({
  //     where: { id: 1 }, // Update a specific bot setting
  //     data: { ...settings },
  //   });
  //   logger.info('Bot settings updated successfully.');
  // } catch (error) {
  //   logger.error('Error updating bot settings:', error);
  //   throw new Error('Failed to update bot settings.');
  // }
};