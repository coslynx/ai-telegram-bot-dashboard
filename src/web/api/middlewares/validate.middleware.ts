import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HttpException } from '../exceptions/HttpException';

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpException(400, 'Validation failed', errors.array()));
  } else {
    next();
  }
};