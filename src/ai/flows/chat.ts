'use server';

/**
 * @fileOverview A conversational AI flow for answering user questions about home maintenance.
 *
 * - chat - The main chat function.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { ChatInputSchema, ChatOutputSchema } from '../schemas';

export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


export async function chat(input: ChatInput): Promise<ChatOutput> {
  const { output } = await chatPrompt(input);
  return { response: output || "I'm sorry, I couldn't generate a response." };
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { format: 'text' },
  prompt: `You are a helpful AI assistant for the Homewise app. Your goal is to answer user questions about home and appliance maintenance. Be friendly, helpful, and concise.

  {{#if history}}
  Here is the chat history:
  {{#each history}}
  - {{role}}: {{{content}}}
  {{/each}}
  {{/if}}

  User's new message: {{{message}}}
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return { response: output || "I'm sorry, I couldn't generate a response." };
  }
);
