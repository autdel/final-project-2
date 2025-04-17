interface TranslationRequest {
    text: string;
    targetLanguage: string;
    sourceLanguage?: string;
  }
  
  interface TranslationResponse {
    translatedText: string;
    detectedSourceLanguage?: string;
  }
  
  export const translateText = async ({ text, targetLanguage, sourceLanguage = 'en'}: TranslationRequest): Promise<TranslationResponse> => {
    const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Translation API key is not configured');
    }
  
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: sourceLanguage,
          format: 'text',
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Translation failed');
      }
  
      const data = await response.json();
      const result = data.data.translations[0];
  
      return {
        translatedText: result.translatedText,
        detectedSourceLanguage: result.detectedSourceLanguage,
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  };