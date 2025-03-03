# AI Image Generator App

This is an AI-powered image generation application built with Next.js and Replicate API. The app allows users to create images from text prompts using state-of-the-art AI models.

## Features

- Generate images from text descriptions
- Powered by Stable Diffusion via Replicate API
- Modern UI built with React and Tailwind CSS
- Next.js 14 App Router for efficient routing and rendering

## Technologies Used

- React with Next.js 14 App Router
- TailwindCSS for styling
- Replicate API for AI image generation
- Firebase for authentication and storage (optional)
- Vercel AI SDK for handling AI interactions

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env.local` file with your API keys:
   ```
   REPLICATE_API_TOKEN=your_replicate_api_token
   ```
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

The following environment variables are required:

- `REPLICATE_API_TOKEN`: Your Replicate API token

## License

This project is open source and available under the MIT License.