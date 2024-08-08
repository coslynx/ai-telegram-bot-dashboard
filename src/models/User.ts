import { User } from '@prisma/client';

export interface User extends User {
  role: 'admin' | 'user';
  theme: 'light' | 'dark';
  chatId?: number;
}