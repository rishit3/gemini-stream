import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
    const reqBody = await req.json();
    const prompt = reqBody.data.prompt;

    if (!prompt) {
        return new Response(JSON.stringify({ error: 'Prompt is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const result = await streamText({
        model: google('gemini-pro'),
        prompt: prompt
    });

    return result.toDataStreamResponse();
}