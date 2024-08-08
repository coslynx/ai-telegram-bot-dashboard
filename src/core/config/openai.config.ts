import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from './constants';

export const openaiConfig = new Configuration({
  apiKey: OPENAI_API_KEY,
});

export const openai = new OpenAIApi(openaiConfig);