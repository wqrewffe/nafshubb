import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai';

export type Type = GenerationConfig;

export class GoogleGenAI {
  private client: GoogleGenerativeAI;

  constructor({ apiKey }: { apiKey: string }) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  get models() {
    return {
      generateContent: async ({ 
        model, 
        contents, 
        config 
      }: { 
        model: string;
        contents: string;
        config?: any;
      }) => {
        const genModel = this.client.getGenerativeModel({ model: 'gemini-pro' });
        const result = await genModel.generateContent(contents);
        const response = await result.response;
        return {
          text: response.text()
        };
      }
    };
  }
}
