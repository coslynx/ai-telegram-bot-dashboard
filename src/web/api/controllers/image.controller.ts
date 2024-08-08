import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} from '../services/image.service';

const prisma = new PrismaClient();

export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await getAllImages();
    res.json({ images });
  } catch (error) {
    console.error('Error getting images:', error);
    res.status(500).json({ error: 'Failed to get images' });
  }
};

export const getImageById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const image = await getImageById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json({ image });
  } catch (error) {
    console.error('Error getting image:', error);
    res.status(500).json({ error: 'Failed to get image' });
  }
};

export const createImage = async (req: Request, res: Response) => {
  const { url, caption, userId, chatId } = req.body;
  try {
    const image = await createImage(url, caption, userId, chatId);
    res.status(201).json({ image });
  } catch (error) {
    console.error('Error creating image:', error);
    res.status(500).json({ error: 'Failed to create image' });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { url, caption, userId, chatId } = req.body;
  try {
    const image = await updateImage(id, url, caption, userId, chatId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json({ image });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Failed to update image' });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const image = await deleteImage(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};