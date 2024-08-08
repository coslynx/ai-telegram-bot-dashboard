import { Response } from 'express';
import { logger } from '../../../utils/logger';

export const successResponse = (res: Response, data: any, message?: string) => {
  try {
    res.status(200).json({
      success: true,
      data,
      message,
    });
  } catch (error) {
    logger.error('Error sending success response:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send success response',
    });
  }
};

export const errorResponse = (res: Response, error: Error, message?: string) => {
  try {
    res.status(400).json({
      success: false,
      error: error.message,
      message,
    });
  } catch (error) {
    logger.error('Error sending error response:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send error response',
    });
  }
};