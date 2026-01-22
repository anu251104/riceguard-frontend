import { useState } from 'react';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

// Define the schema for disease detection
const detectionSchema = z.object({
  disease: z.string().describe('The name of the detected rice disease or "Healthy"'),
  confidence: z.number().min(0).max(1).describe('Confidence score between 0 and 1'),
  treatment: z.string().describe('Recommended sustainable/organic treatment and remedy'),
});

export function useImageAnalysis(sceneName = 'disease_detector') {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeImage = async (imageFile) => {
    setIsAnalyzing(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Image = await new Promise((resolve, reject) => {
        reader.onload = (e) => resolve(e.target?.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      const config = globalThis.ywConfig?.ai_config?.[sceneName];
      if (!config) {
        throw new Error(`API Error - Configuration '${sceneName}' not found`);
      }

      const openai = createOpenAI({
        baseURL: 'https://api.youware.com/public/v1/ai',
        apiKey: 'sk-YOUWARE'
      });

      const result = await generateObject({
        model: openai(config.model),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: config.system_prompt || 'Analyze this image.' },
              { type: 'image', image: base64Image }
            ]
          }
        ],
        schema: detectionSchema,
        temperature: config.temperature || 0.1,
      });

      return {
        ...result.object,
        imageName: imageFile.name,
        date: new Date().toLocaleString(),
        thumbnail: base64Image // Use the base64 as thumbnail
      };

    } catch (error) {
      console.error('Analysis failed:', error);
      throw new Error(error.message || 'Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeImage, isAnalyzing };
}
