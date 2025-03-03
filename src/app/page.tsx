'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/replicate/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">AI Image Generator</h1>
      
      <div className="w-full space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="prompt" className="text-lg font-medium">
            Enter your prompt:
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city with flying cars and neon lights"
            className="p-3 border rounded-md h-32 resize-none"
            disabled={loading}
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}
        
        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
      
      {loading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Generating your image... This may take a moment.</p>
        </div>
      )}
      
      {imageUrl && !loading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-lg border rounded-md overflow-hidden">
            <Image
              src={imageUrl}
              alt="Generated image"
              fill
              className="object-contain"
            />
          </div>
          <a
            href={imageUrl}
            download="generated-image.png"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-blue-600 hover:underline"
          >
            Download Image
          </a>
        </div>
      )}
    </main>
  );
}
