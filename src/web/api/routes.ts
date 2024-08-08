import express from 'express';
import {
  getAllConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation,
} from './controllers/conversation.controller';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from './controllers/user.controller';
import {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} from './controllers/image.controller';
import {
  getBotStatus,
  startBot,
  stopBot,
  sendBotMessage,
  getBotMessages,
  updateBotSettings,
} from './controllers/bot.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import { validateMiddleware } from './middlewares/validate.middleware';

const router = express.Router();

// Conversation Routes
router.get('/conversations', authMiddleware, getAllConversations);
router.get('/conversations/:id', authMiddleware, getConversationById);
router.post('/conversations', authMiddleware, validateMiddleware, createConversation);
router.put('/conversations/:id', authMiddleware, validateMiddleware, updateConversation);
router.delete('/conversations/:id', authMiddleware, deleteConversation);

// User Routes
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.post('/users', authMiddleware, validateMiddleware, createUser);
router.put('/users/:id', authMiddleware, validateMiddleware, updateUser);
router.delete('/users/:id', authMiddleware, deleteUser);

// Image Routes
router.get('/images', authMiddleware, getAllImages);
router.get('/images/:id', authMiddleware, getImageById);
router.post('/images', authMiddleware, validateMiddleware, createImage);
router.put('/images/:id', authMiddleware, validateMiddleware, updateImage);
router.delete('/images/:id', authMiddleware, deleteImage);

// Bot Routes
router.get('/bot/status', authMiddleware, getBotStatus);
router.post('/bot/start', authMiddleware, startBot);
router.post('/bot/stop', authMiddleware, stopBot);
router.post('/bot/message', authMiddleware, validateMiddleware, sendBotMessage);
router.get('/bot/messages', authMiddleware, getBotMessages);
router.put('/bot/settings', authMiddleware, validateMiddleware, updateBotSettings);

export default router;