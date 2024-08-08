import { ChatCompletionRequestMessage } from 'openai';

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const DATABASE_URL = process.env.DATABASE_URL || '';

export const DEFAULT_MODEL = 'gpt-3.5-turbo';
export const MAX_TOKENS = 4096;
export const TEMPERATURE = 0.7;

export const DEFAULT_CHAT_HISTORY_LENGTH = 5;

export const SYSTEM_PROMPT = 'You are a helpful and informative AI assistant. You should always strive to be as informative as possible, even if the user only asks a simple question. ';

export const BOT_COMMANDS = {
  start: '/start',
  help: '/help',
  translate: '/translate',
} as const;

export const TELEGRAM_MESSAGE_TYPES = {
  text: 'text',
  photo: 'photo',
  video: 'video',
  document: 'document',
  audio: 'audio',
  voice: 'voice',
  location: 'location',
  contact: 'contact',
  venue: 'venue',
  poll: 'poll',
  sticker: 'sticker',
  animation: 'animation',
  game: 'game',
  invoice: 'invoice',
  successful_payment: 'successful_payment',
  connected_website: 'connected_website',
  proximity_alert_triggered: 'proximity_alert_triggered',
  delete_chat_photo: 'delete_chat_photo',
  group_chat_created: 'group_chat_created',
  supergroup_chat_created: 'supergroup_chat_created',
  channel_chat_created: 'channel_chat_created',
  migrate_to_chat_id: 'migrate_to_chat_id',
  migrate_from_chat_id: 'migrate_from_chat_id',
  pinned_message: 'pinned_message',
  new_chat_members: 'new_chat_members',
  left_chat_member: 'left_chat_member',
  new_chat_title: 'new_chat_title',
  new_chat_photo: 'new_chat_photo',
  delete_chat_photo: 'delete_chat_photo',
  group_chat_created: 'group_chat_created',
  supergroup_chat_created: 'supergroup_chat_created',
  channel_chat_created: 'channel_chat_created',
  migrate_to_chat_id: 'migrate_to_chat_id',
  migrate_from_chat_id: 'migrate_from_chat_id',
  pinned_message: 'pinned_message',
  new_chat_members: 'new_chat_members',
  left_chat_member: 'left_chat_member',
  new_chat_title: 'new_chat_title',
  new_chat_photo: 'new_chat_photo',
  delete_chat_photo: 'delete_chat_photo',
  group_chat_created: 'group_chat_created',
  supergroup_chat_created: 'supergroup_chat_created',
  channel_chat_created: 'channel_chat_created',
  migrate_to_chat_id: 'migrate_to_chat_id',
  migrate_from_chat_id: 'migrate_from_chat_id',
  pinned_message: 'pinned_message',
  new_chat_members: 'new_chat_members',
  left_chat_member: 'left_chat_member',
  new_chat_title: 'new_chat_title',
  new_chat_photo: 'new_chat_photo',
} as const;

export const DEFAULT_CHAT_COMPLETION_REQUEST: ChatCompletionRequestMessage = {
  role: 'user',
  content: '',
};

export const DEFAULT_CHAT_HISTORY: ChatCompletionRequestMessage[] = [];