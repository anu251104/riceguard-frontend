import { useState, useCallback } from 'react';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export function useConversation(sceneName = 'chat_assistant') {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage, variables = {}) => {
    const config = globalThis.ywConfig?.ai_config?.[sceneName];
    if (!config) {
      throw new Error(`API Error - Configuration '${sceneName}' not found`);
    }

    setIsLoading(true);

    // Add user message to history
    const newUserMessage = { role: 'user', content: userMessage };
    setConversationHistory(prev => [...prev, newUserMessage]);

    const openai = createOpenAI({
      baseURL: 'https://api.youware.com/public/v1/ai',
      apiKey: 'sk-YOUWARE'
    });

    try {
      const { text } = await generateText({
        model: openai(config.model),
        messages: [
          ...(config.system_prompt ? [{ role: 'system', content: typeof config.system_prompt === 'function' ? config.system_prompt(variables) : config.system_prompt }] : []),
          ...conversationHistory, // Include full conversation context
          newUserMessage
        ],
        temperature: config.temperature || 0.7,
        maxTokens: config.maxTokens || 4000
      });

      // Add AI response to history
      const assistantMessage = { role: 'assistant', content: text };
      setConversationHistory(prev => [...prev, assistantMessage]);

      return text;
    } catch (error) {
      throw new Error(`API Error - Conversation failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [sceneName, conversationHistory]);

  const resetConversation = useCallback(() => {
    setConversationHistory([]);
  }, []);

  return {
    conversationHistory,
    sendMessage,
    resetConversation,
    isLoading
  };
}
