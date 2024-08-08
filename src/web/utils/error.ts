import { Response } from 'express';
import { logger } from '../../../utils/logger';

export class HttpException extends Error {
  status: number;
  message: string;
  errors?: any[];

  constructor(status: number, message: string, errors?: any[]) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

export const errorHandler = (
  err: HttpException | Error,
  req: any,
  res: Response,
  next: any
) => {
  if (err instanceof HttpException) {
    logger.error('HttpException:', err);
    res.status(err.status).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else {
    logger.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};