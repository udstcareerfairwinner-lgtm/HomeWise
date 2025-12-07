
'use server';

/**
 * @fileOverview Provides AI-powered recommendations for cost-saving maintenance tips.
 *
 * - getMaintenanceRecommendations - A function that retrieves maintenance recommendations.
 * - MaintenanceRecommendationsInput - The input type for the getMaintenanceRecommendations function.
 * - MaintenanceRecommendationsOutput - The return type for the getMaintenanceRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {getGeolocationTool} from './tools/geolocation';
import {
    MaintenanceRecommendationsInputSchema,
    MaintenanceRecommendationsOutputSchema,
    type MaintenanceRecommendationsInput
} from '@/ai/schemas';

export { type MaintenanceRecommendationsOutput } from '@/ai/schemas';
export type { MaintenanceRecommendationsInput };


export async function getMaintenanceRecommendations(input: MaintenanceRecommendationsInput): Promise<MaintenanceRecommendationsOutput> {
  return await maintenanceRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintenanceRecommendationsPrompt',
  input: {schema: MaintenanceRecommendationsInputSchema},
  output: {schema: MaintenanceRecommendationsOutputSchema},
  tools: [getGeolocationTool],
  prompt: `You are an AI assistant for the Homewise app. Your purpose is to provide users with recommendations on how to save costs on maintaining their machines and vehicles.

  Given the following information about a household machine, provide cost-saving tips, recommend service providers, estimate its remaining useful life, and highlight any critical attention needed.

  Machine Information:
  - Category: {{{category}}}
  - Brand: {{{brand}}}
  - Model: {{{model}}}
  - Usage: {{{usageFrequency}}}
  - Purchased: {{{purchaseDate}}}
  - Last Service: {{{lastMaintenanceDate}}}
  {{#if maintenanceHistory}}
  - History: {{jsonStringify maintenanceHistory}}
  {{/if}}

  {{#if location}}
  The user is located at: {{{location}}}.
  Use the getGeolocationTool to find service providers near this location.
  {{else}}
  The user has not provided a location. Suggest generic service provider types.
  {{/if}}

  Provide your response in a JSON object adhering to the specified output schema.
`,
});

const maintenanceRecommendationsFlow = ai.defineFlow(
  {
    name: 'maintenanceRecommendationsFlow',
    inputSchema: MaintenanceRecommendationsInputSchema,
    outputSchema: MaintenanceRecommendationsOutputSchema,
  },
  async input => {
    const { output } = await prompt.generate({ input });
    if (!output) {
      throw new Error('Unable to generate recommendations.');
    }
    return output;
  }
);
