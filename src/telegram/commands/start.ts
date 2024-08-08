import { ContextMessageUpdate, Message } from 'node-telegram-bot-api';
import { BOT_COMMANDS, SYSTEM_PROMPT } from '../constants';
import { OpenAIService } from '../services/openai.service';

export const handleStartCommand = async (
  ctx: ContextMessageUpdate,
  openAIService: OpenAIService
) => {
  const message = ctx.message as Message;
  const chatId = message.chat.id;

  try {
    const response = await openAIService.generateText(
      `${SYSTEM_PROMPT} You are now in a conversation with a powerful AI assistant. What can I help you with?`
    );
    await ctx.reply(response);
  } catch (error) {
    console.error('Error handling start command:', error);
    await ctx.reply(
      'An error occurred while processing your request. Please try again later.'
    );
  }
};