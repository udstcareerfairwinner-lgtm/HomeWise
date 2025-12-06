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

export async function getMaintenanceRecommendations(input: MaintenanceRecommendationsInput): Promise<MaintenanceRecommendationsOutput> {
  const { output } = await prompt(input);
  return output!;
}

const prompt = ai.definePrompt({
  name: 'maintenanceRecommendationsPrompt',
  input: {schema: MaintenanceRecommendationsInputSchema},
  output: {schema: MaintenanceRecommendationsOutputSchema},
  tools: [getGeolocationTool],
  prompt: `You are an AI assistant for the Homewise app. Your purpose is to provide users with recommendations on how to save costs on maintaining their machines and vehicles.

  Given the following information about a household machine, provide cost-saving tips, recommend service providers, estimate its remaining useful life, and highlight any critical attention needed.

  Machine Type: {{{machineType}}}
  Brand: {{{brand}}}
  Model: {{{model}}}
  Usage Frequency: {{{usageFrequency}}}
  Last Maintenance Date: {{{lastMaintenanceDate}}}
  Purchase Date: {{{purchaseDate}}}
  Maintenance History: {{{maintenanceHistory}}}
  {{#if location}}
  User's Location: {{{location}}}
  
  When recommending service providers, use the getGeolocationTool to find the coordinates for the user's location. Then, suggest specific, real service providers or types of service providers (like 'Toyota dealership' or 'certified auto repair shops') near that location. For non-vehicle machines, suggest general service types available in the area.
  {{else}}
  When recommending service providers, please suggest a few options for common locations (e.g., "a local auto shop," "a certified appliance repair service") since no specific location was provided.
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
    const { output } = await prompt(input);
    return output!;
  }
);
