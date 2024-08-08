import { PrismaClient } from '@prisma/client';
import { logger } from '../../../utils/logger';

const prisma = new PrismaClient();

export const getAllImages = async () => {
  try {
    const images = await prisma.image.findMany();
    return images;
  } catch (error) {
    logger.error('Error getting images:', error);
    throw new Error('Failed to get images.');
  }
};

export const getImageById = async (id: string) => {
  try {
    const image = await prisma.image.findUnique({
      where: { id },
    });
    return image;
  } catch (error) {
    logger.error('Error getting image:', error);
    throw new Error('Failed to get image.');
  }
};

export const createImage = async (url: string, caption: string, userId: number, chatId: number) => {
  try {
    const image = await prisma.image.create({
      data: {
        url,
        caption,
        userId,
        chatId,
      },
    });
    return image;
  } catch (error) {
    logger.error('Error creating image:', error);
    throw new Error('Failed to create image.');
  }
};

export const updateImage = async (
  id: string,
  url: string,
  caption: string,
  userId: number,
  chatId: number
) => {
  try {
    const image = await prisma.image.update({
      where: { id },
      data: {
        url,
        caption,
        userId,
        chatId,
      },
    });
    return image;
  } catch (error) {
    logger.error('Error updating image:', error);
    throw new Error('Failed to update image.');
  }
};

export const deleteImage = async (id: string) => {
  try {
    const image = await prisma.image.delete({
      where: { id },
    });
    return image;
  } catch (error) {
    logger.error('Error deleting image:', error);
    throw new Error('Failed to delete image.');
  }
};