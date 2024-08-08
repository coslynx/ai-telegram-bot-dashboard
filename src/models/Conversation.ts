import { Conversation } from '@prisma/client';
import { ChatHistoryItem } from '../telegram/types/types';

export interface Conversation extends Conversation {
  chatHistory: ChatHistoryItem[];
}