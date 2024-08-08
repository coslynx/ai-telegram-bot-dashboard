import { ContextMessageUpdate, Message } from 'node-telegram-bot-api';
import { BOT_COMMANDS } from '../constants';

export const handleHelpCommand = async (ctx: ContextMessageUpdate) => {
  const message = ctx.message as Message;
  const chatId = message.chat.id;

  const commands = Object.values(BOT_COMMANDS).join(', ');

  await ctx.reply(
    `Here are the available commands:\n\n${commands}\n\nTo use a command, simply type it into the chat, followed by any necessary arguments. For example: /translate Hello world into Spanish\n\nFor more information on a specific command, simply type the command name followed by a question mark (?). For example: /translate?`
  );
};