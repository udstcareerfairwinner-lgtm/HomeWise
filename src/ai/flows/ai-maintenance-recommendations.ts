'use server';

/**
 * @fileOverview Provides AI-powered recommendations for cost-saving maintenance tips.
 *
 * - getMaintenanceRecommendations - A function that retrieves maintenance recommendations.
 * - MaintenanceRecommendationsInput - The input type for the getMaintenanceRecommendations function.
 * - MaintenanceRecommendationsOutput - The return type for the getMaintenanceRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaintenanceRecommendationsInputSchema = z.object({
  machineType: z.string().describe('The type of machine (e.g., car, fridge, AC).'),
  brand: z.string().describe('The brand of the machine.'),
  model: z.string().describe('The model of the machine.'),
  usageFrequency: z.string().describe('How often the machine is used (e.g., daily, weekly, monthly).'),
  lastMaintenanceDate: z.string().describe('The date of the last maintenance.'),
  purchaseDate: z.string().describe('The date the machine was purchased.'),
  maintenanceHistory: z.string().describe('The maintenance history of the machine.'),
});
export type MaintenanceRecommendationsInput = z.infer<typeof MaintenanceRecommendationsInputSchema>;

const MaintenanceRecommendationsOutputSchema = z.object({
  costSavingTips: z.string().describe('AI-powered recommendations for saving costs on maintaining the machine.'),
  recommendedServiceProviders: z.string().describe('Recommended nearby service providers for maintenance.'),
  estimatedRemainingLife: z.string().describe('Estimated remaining useful life for the machine.'),
  criticalAttentionNeeded: z.string().describe('Highlights if the machine needs critical attention.'),
});
export type MaintenanceRecommendationsOutput = z.infer<typeof MaintenanceRecommendationsOutputSchema>;

export async function getMaintenanceRecommendations(input: MaintenanceRecommendationsInput): Promise<MaintenanceRecommendationsOutput> {
  return maintenanceRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintenanceRecommendationsPrompt',
  input: {schema: MaintenanceRecommendationsInputSchema},
  output: {schema: MaintenanceRecommendationsOutputSchema},
  prompt: `You are an AI assistant for the HomeCare AI app. Your purpose is to provide users with recommendations on how to save costs on maintaining their machines and vehicles.

  Given the following information about a household machine, provide cost-saving tips, recommend service providers, estimate remaining useful life, and highlight any critical attention needed.

  Machine Type: {{{machineType}}}
  Brand: {{{brand}}}
  Model: {{{model}}}
  Usage Frequency: {{{usageFrequency}}}
  Last Maintenance Date: {{{lastMaintenanceDate}}}
  Purchase Date: {{{purchaseDate}}}
  Maintenance History: {{{maintenanceHistory}}}

  Format your response in JSON.
`,
});

const maintenanceRecommendationsFlow = ai.defineFlow(
  {
    name: 'maintenanceRecommendationsFlow',
    inputSchema: MaintenanceRecommendationsInputSchema,
    outputSchema: MaintenanceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
