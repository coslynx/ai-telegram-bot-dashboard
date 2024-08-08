import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { Message, Update } from 'node-telegram-bot-api';
import { PrismaClient } from '@prisma/client';
import { OPENAI_API_KEY, DEFAULT_MODEL, MAX_TOKENS, TEMPERATURE, DEFAULT_CHAT_HISTORY_LENGTH } from '../constants';
import { getChatHistory, saveChatHistory } from './utils';

export interface TelegramMessage extends Message {
  // Add any custom properties or interfaces here as needed.
  // For example, you could add properties for user information, context, etc.
  // chatHistory: ChatCompletionRequestMessage[];
  // user: User;
  // context: string;
}

export interface TelegramUpdate extends Update {
  // Add any custom properties or interfaces here as needed.
  // For example, you could add properties for user information, context, etc.
  // message: TelegramMessage;
  // user: User;
  // context: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  // Add any other user properties as needed.
}

export interface ChatHistoryItem extends ChatCompletionRequestMessage {
  // Add any other custom properties for chat history items.
}

export interface Conversation {
  id: string;
  userId: number;
  chatId: number;
  // Add any other conversation properties as needed.
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: ChatCompletionRequestMessage;
    index: number;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface OpenAIService {
  generateText(prompt: string, model?: string, maxTokens?: number, temperature?: number): Promise<ChatCompletionResponse>;
  getEmbeddings(text: string): Promise<number[]>;
}

export interface DatabaseService {
  // ... your database service methods
  getUser(id: number): Promise<User | null>;
  saveChatHistory(chatId: number, userId: number, chatHistory: ChatHistoryItem[]): Promise<void>;
  getChatHistory(chatId: number, userId: number): Promise<ChatHistoryItem[]>;
  // ... other database methods
}

export class OpenAIServiceImpl implements OpenAIService {
  private readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateText(prompt: string, model: string = DEFAULT_MODEL, maxTokens: number = MAX_TOKENS, temperature: number = TEMPERATURE): Promise<ChatCompletionResponse> {
    try {
      const response = await this.openai.createChatCompletion({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
        temperature,
      });

      return response.data;
    } catch (error) {
      console.error('Error generating text:', error);
      throw new Error('An error occurred while processing your request.');
    }
  }

  async getEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await this.openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: text,
      });

      return response.data.data[0].embedding;
    } catch (error) {
      console.error('Error getting embeddings:', error);
      throw new Error('An error occurred while getting embeddings.');
    }
  }
}

export class DatabaseServiceImpl implements DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getUser(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      throw new Error('An error occurred while getting user.');
    }
  }

  async saveChatHistory(chatId: number, userId: number, chatHistory: ChatHistoryItem[]): Promise<void> {
    try {
      await this.prisma.conversation.update({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
        data: {
          chatHistory,
        },
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
      throw new Error('An error occurred while saving chat history.');
    }
  }

  async getChatHistory(chatId: number, userId: number): Promise<ChatHistoryItem[]> {
    try {
      const conversation = await this.prisma.conversation.findUnique({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
      });

      return conversation?.chatHistory || [];
    } catch (error) {
      console.error('Error getting chat history:', error);
      throw new Error('An error occurred while getting chat history.');
    }
  }
}