import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { 
  getAllConversations, 
  getConversationById, 
  createConversation, 
  updateConversation, 
  deleteConversation 
} from '../services/conversation.service';

const prisma = new PrismaClient();

export const getAllConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await getAllConversations();
    res.json({ conversations });
  } catch (error) {
    console.error('Error getting conversations:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await getConversationById(id);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json({ conversation });
  } catch (error) {
    console.error('Error getting conversation:', error);
    res.status(500).json({ error: 'Failed to get conversation' });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  const { userId, chatId, chatHistory } = req.body;
  try {
    const conversation = await createConversation(userId, chatId, chatHistory);
    res.status(201).json({ conversation });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};

export const updateConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, chatId, chatHistory } = req.body;
  try {
    const conversation = await updateConversation(id, userId, chatId, chatHistory);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json({ conversation });
  } catch (error) {
    console.error('Error updating conversation:', error);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await deleteConversation(id);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
};