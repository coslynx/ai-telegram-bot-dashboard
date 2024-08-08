import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getBotStatus } from '../services/bot.service';
import { startBot } from '../services/bot.service';
import { stopBot } from '../services/bot.service';
import { sendBotMessage } from '../services/bot.service';
import { getBotMessages } from '../services/bot.service';
import { updateBotSettings } from '../services/bot.service';

const prisma = new PrismaClient();

export const getBotStatus = async (req: Request, res: Response) => {
  try {
    const status = await getBotStatus();
    res.json({ status });
  } catch (error) {
    console.error('Error getting bot status:', error);
    res.status(500).json({ error: 'Failed to get bot status' });
  }
};

export const startBot = async (req: Request, res: Response) => {
  try {
    await startBot();
    res.json({ message: 'Bot started successfully' });
  } catch (error) {
    console.error('Error starting bot:', error);
    res.status(500).json({ error: 'Failed to start bot' });
  }
};

export const stopBot = async (req: Request, res: Response) => {
  try {
    await stopBot();
    res.json({ message: 'Bot stopped successfully' });
  } catch (error) {
    console.error('Error stopping bot:', error);
    res.status(500).json({ error: 'Failed to stop bot' });
  }
};

export const sendBotMessage = async (req: Request, res: Response) => {
  const { message, chatId } = req.body;

  try {
    await sendBotMessage(message, chatId);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending bot message:', error);
    res.status(500).json({ error: 'Failed to send bot message' });
  }
};

export const getBotMessages = async (req: Request, res: Response) => {
  try {
    const messages = await getBotMessages();
    res.json({ messages });
  } catch (error) {
    console.error('Error getting bot messages:', error);
    res.status(500).json({ error: 'Failed to get bot messages' });
  }
};

export const updateBotSettings = async (req: Request, res: Response) => {
  const { settings } = req.body;

  try {
    await updateBotSettings(settings);
    res.json({ message: 'Bot settings updated successfully' });
  } catch (error) {
    console.error('Error updating bot settings:', error);
    res.status(500).json({ error: 'Failed to update bot settings' });
  }
};