import dotenv from 'dotenv';

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
export const GOOGLE_CLOUD_VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY || '';
export const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || '';
export const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY || '';
export const NEWSAPI_ORG_API_KEY = process.env.NEWSAPI_ORG_API_KEY || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';