import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '../constants';

export class OpenAIService {
  private readonly openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generateText(prompt: string, model: string = 'gpt-3.5-turbo'): Promise<string> {
    try {
      const response = await this.openai.createChatCompletion({
        model,
        messages: [{ role: 'user', content: prompt }],
      });

      return response.data.choices[0].message?.content || '';
    } catch (error) {
      console.error('Error generating text:', error);
      return 'An error occurred while processing your request.';
    }
  }

  async getEmbeddings(text: string): Promise<number[]> {
    try {
      const response = await this.openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: text,
      });

      return response.data.data[0].embedding;
    } catch (error) {
      console.error('Error getting embeddings:', error);
      return [];
    }
  }
}