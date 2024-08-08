import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { HttpException } from '../exceptions/HttpException';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next(new HttpException(401, 'Unauthorized'));
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new HttpException(401, 'Unauthorized'));
  }
};