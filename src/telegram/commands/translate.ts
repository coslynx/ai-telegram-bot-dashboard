import { ContextMessageUpdate, Message, Telegraf } from 'node-telegram-bot-api';
import { OpenAIService } from '../services/openai.service';
import { BOT_COMMANDS, DEFAULT_MODEL, MAX_TOKENS, TEMPERATURE } from '../constants';

export const handleTranslateCommand = async (
  ctx: ContextMessageUpdate,
  openAIService: OpenAIService
) => {
  const message = ctx.message as Message;
  const text = message.text;
  const args = text.split(' ');

  if (args.length < 3) {
    await ctx.reply(
      'Please provide the text you want to translate and the target language.'
    );
    return;
  }

  const textToTranslate = args.slice(1).join(' ');
  const targetLanguage = args[1];

  try {
    const translatedText = await openAIService.generateText(
      `Translate the following text into ${targetLanguage}: ${textToTranslate}`,
      DEFAULT_MODEL,
      MAX_TOKENS,
      TEMPERATURE
    );
    await ctx.reply(translatedText);
  } catch (error) {
    console.error('Error translating text:', error);
    await ctx.reply(
      'An error occurred while processing your request. Please try again later.'
    );
  }
};