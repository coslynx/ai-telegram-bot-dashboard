import { PrismaClient } from '@prisma/client';
import { logger } from '../../../utils/logger';

const prisma = new PrismaClient();

export const getAllConversations = async () => {
  try {
    const conversations = await prisma.conversation.findMany();
    return conversations;
  } catch (error) {
    logger.error('Error getting conversations:', error);
    throw new Error('Failed to get conversations.');
  }
};

export const getConversationById = async (id: string) => {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id },
    });
    return conversation;
  } catch (error) {
    logger.error('Error getting conversation:', error);
    throw new Error('Failed to get conversation.');
  }
};

export const createConversation = async (
  userId: number,
  chatId: number,
  chatHistory: any[]
) => {
  try {
    const conversation = await prisma.conversation.create({
      data: {
        userId,
        chatId,
        chatHistory,
      },
    });
    return conversation;
  } catch (error) {
    logger.error('Error creating conversation:', error);
    throw new Error('Failed to create conversation.');
  }
};

export const updateConversation = async (
  id: string,
  userId: number,
  chatId: number,
  chatHistory: any[]
) => {
  try {
    const conversation = await prisma.conversation.update({
      where: { id },
      data: {
        userId,
        chatId,
        chatHistory,
      },
    });
    return conversation;
  } catch (error) {
    logger.error('Error updating conversation:', error);
    throw new Error('Failed to update conversation.');
  }
};

export const deleteConversation = async (id: string) => {
  try {
    const conversation = await prisma.conversation.delete({
      where: { id },
    });
    return conversation;
  } catch (error) {
    logger.error('Error deleting conversation:', error);
    throw new Error('Failed to delete conversation.');
  }
};