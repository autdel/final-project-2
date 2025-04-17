// I got some AI help here setting up the requests to figure out the rights
// fields and formats, particularly figuring out the interfaces and model
interface OpenAIRequest {
    prompt: string;
    maxTokens?: number;
    temperature?: number;
}
  
interface OpenAIResponse {
    text: string;
    usage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
}
  
export const generateText = async ({
    prompt,
    maxTokens = 150,
    temperature = 0.7
}: OpenAIRequest): Promise<OpenAIResponse> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: maxTokens,
          temperature: temperature,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'OpenAI request failed');
      }
  
      const data = await response.json();
      
      return {
        text: data.choices[0].message.content,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        },
      };
    } catch (error) {
      console.error('OpenAI error:', error);
      throw error;
    }
};
  
export const generateVocabulary = async (
    topic: string,
    targetLanguage: string,
    count: number = 10,
    difficulty: string,
): Promise<Array<{ word: string, translation: string }>> => {
    console.log(`Data: \n Topic: ${topic} \n Target Language: ${targetLanguage} \n Count: ${count}`);
    
    const prompt = `Generate ${count} vocabulary words or phrases related to "${topic}" in English with their translations 
      in ${targetLanguage}. On a scale from easy to expert, these words or phrases should be "${difficulty}" for a language learner. 
      If the provided topic cannot be understood, use the topic 'school'. Format the response as a JSON array with objects containing 
      "word" and "translation" properties.`;
    
    try {
      const result = await generateText({
        prompt,
        maxTokens: 500,
        temperature: 0.7,
      });
      
      // Parse the JSON response
      console.log('Response: ', result.text);
      setTimeout(() => {}, 10000);
      return JSON.parse(result.text);
    } catch (error) {
      console.error('Failed to generate vocabulary:', error);
      throw error;
    }
};