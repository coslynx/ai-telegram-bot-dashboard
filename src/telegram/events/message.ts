import { ContextMessageUpdate, Message } from 'node-telegram-bot-api';
import { OpenAIService } from '../services/openai.service';
import { DEFAULT_MODEL, MAX_TOKENS, TEMPERATURE, DEFAULT_CHAT_HISTORY_LENGTH, SYSTEM_PROMPT, DEFAULT_CHAT_COMPLETION_REQUEST, DEFAULT_CHAT_HISTORY } from '../constants';
import { getChatHistory, saveChatHistory } from './utils';

export const handleMessage = async (
  ctx: ContextMessageUpdate,
  openAIService: OpenAIService
) => {
  const message = ctx.message as Message;
  const chatId = message.chat.id;
  const userId = message.from?.id;

  if (!userId) {
    await ctx.reply('Please start a private chat with the bot.');
    return;
  }

  const userText = message.text;

  if (!userText) {
    return;
  }

  let chatHistory = await getChatHistory(chatId, userId);

  const currentMessage: ChatCompletionRequestMessage = {
    ...DEFAULT_CHAT_COMPLETION_REQUEST,
    content: userText,
  };

  chatHistory = [...chatHistory.slice(-DEFAULT_CHAT_HISTORY_LENGTH), currentMessage];

  try {
    const response = await openAIService.generateText(
      `${SYSTEM_PROMPT} ${chatHistory.map((item) => `${item.role}: ${item.content}`).join('\n')}`,
      DEFAULT_MODEL,
      MAX_TOKENS,
      TEMPERATURE
    );

    await ctx.reply(response.choices[0].message?.content || '');

    chatHistory = [...chatHistory, { role: 'assistant', content: response.choices[0].message?.content || '' }];

    await saveChatHistory(chatId, userId, chatHistory);
  } catch (error) {
    console.error('Error handling message:', error);
    await ctx.reply(
      'An error occurred while processing your request. Please try again later.'
    );
  }
};