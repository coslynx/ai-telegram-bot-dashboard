import { Image } from '@prisma/client';

export interface Image extends Image {
  userId: number;
  chatId: number;
}