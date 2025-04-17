// I needed this page to test if my api works due to openAI problems. This let's me see that both return a response
import { useState } from 'react';
import { translateText } from '../services/translationService';
import { generateVocabulary } from '../services/aiService';

const ApiTest = () => {
  const [translationResult, setTranslationResult] = useState('');
  const [openaiResult, setOpenaiResult] = useState<Array<{ word: string, translation: string }>>([]);
  const [loading, setLoading] = useState({ translation: false, openai: false });
  const [error, setError] = useState({ translation: '', openai: '' });

  const testTranslation = async () => {
    setLoading(prev => ({ ...prev, translation: true }));
    setError(prev => ({ ...prev, translation: '' }));
    
    try {
      const result = await translateText({
        text: 'Hello, how are you today?',
        targetLanguage: 'es',
      });
      
      setTranslationResult(result.translatedText);
    } catch (err) {
      setError(prev => ({ ...prev, translation: (err as Error).message }));
    } finally {
      setLoading(prev => ({ ...prev, translation: false }));
    }
  };

  const testOpenAI = async () => {
    setLoading(prev => ({ ...prev, openai: true }));
    setError(prev => ({ ...prev, openai: '' }));
    
    try {
      const result = await generateVocabulary('food', 'es', 5, 'easy');
      setOpenaiResult(result);
    } catch (err) {
      setError(prev => ({ ...prev, openai: (err as Error).message }));
    } finally {
      setLoading(prev => ({ ...prev, openai: false }));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Translate API Test */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Google Translate API</h2>
          <button 
            className="btn-primary mb-4"
            onClick={testTranslation}
            disabled={loading.translation}
          >
            {loading.translation ? 'Translating...' : 'Test Translation'}
          </button>
          
          {error.translation && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              Error: {error.translation}
            </div>
          )}
          
          {translationResult && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md">
              Translation: {translationResult}
            </div>
          )}
        </div>
        
        {/* OpenAI API Test */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">OpenAI API</h2>
          <button 
            className="btn-primary mb-4"
            onClick={testOpenAI}
            disabled={loading.openai}
          >
            {loading.openai ? 'Generating...' : 'Test OpenAI'}
          </button>
          
          {error.openai && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
              Error: {error.openai}
            </div>
          )}
          
          {openaiResult.length > 0 && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md">
              <h3 className="font-medium mb-2">Generated Vocabulary:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {openaiResult.map((item, index) => (
                  <li key={index}>
                    {item.word}: {item.translation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTest;