import { PrismaClient } from '@prisma/client';
import { logger } from '../../../utils/logger';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    logger.error('Error getting users:', error);
    throw new Error('Failed to get users.');
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    logger.error('Error getting user:', error);
    throw new Error('Failed to get user.');
  }
};

export const createUser = async (firstName: string, lastName: string, username: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password,
      },
    });
    return user;
  } catch (error) {
    logger.error('Error creating user:', error);
    throw new Error('Failed to create user.');
  }
};

export const updateUser = async (
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string
) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        username,
        password,
      },
    });
    return user;
  } catch (error) {
    logger.error('Error updating user:', error);
    throw new Error('Failed to update user.');
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    logger.error('Error deleting user:', error);
    throw new Error('Failed to delete user.');
  }
};