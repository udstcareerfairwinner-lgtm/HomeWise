
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
  prompt: `You are an AI assistant for the Homewise app. Your purpose is to provide users with recommendations on how to save costs on maintaining their machines and vehicles.

  Given the following information about a household machine, provide cost-saving tips, recommend service providers, estimate its remaining useful life, and highlight any critical attention needed.

  Machine Type: {{{category}}}
  Brand: {{{brand}}}
  Model: {{{model}}}
  Usage Frequency: {{{usageFrequency}}}
  Last Maintenance Date: {{{lastMaintenanceDate}}}
  Purchase Date: {{{purchaseDate}}}

  {{#if maintenanceHistory}}
  Maintenance History:
  {{#each maintenanceHistory}}
  - Task: {{{task}}}, Date: {{{date}}}, Cost: {{{cost}}}
  {{/each}}
  {{/if}}

  {{#if location}}
  The user has provided their location as: {{{location}}}.
  
  When recommending service providers, use the getGeolocationTool to find the coordinates for the user's location. Then, suggest specific, real service providers or types of service providers (like 'Toyota dealership' or 'certified auto repair shops') near that location. For non-vehicle machines, suggest general service types available in the area.
  {{else}}
  No specific location was provided. When recommending service providers, please suggest generic options like "a local auto shop," or "a certified appliance repair service".
  {{/if}}

  Your response should be structured as a JSON object that strictly adheres to the output schema.
`,
});

const maintenanceRecommendationsFlow = ai.defineFlow(
  {
    name: 'maintenanceRecommendationsFlow',
    inputSchema: MaintenanceRecommendationsInputSchema,
    outputSchema: MaintenanceRecommendationsOutputSchema,
  },
  async input => {
    const { output } = await prompt.generate({ input, tools: [getGeolocationTool] });
    if (!output) {
      throw new Error('Unable to generate recommendations.');
    }
    return output;
  }
);
