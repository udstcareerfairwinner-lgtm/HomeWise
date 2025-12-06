'use server';

/**
 * @fileOverview Implements the predictive maintenance flow for household machines.
 *
 * - predictMaintenance - Predicts the next maintenance date and task for a given machine.
 * - PredictiveMaintenanceInput - The input type for the predictMaintenance function.
 * - PredictiveMaintenanceOutput - The return type for the predictMaintenance function.
 */

import {ai} from '@/ai/genkit';
import {
    PredictiveMaintenanceInputSchema,
    PredictiveMaintenanceOutputSchema,
    type PredictiveMaintenanceInput
} from '@/ai/schemas';

export { type PredictiveMaintenanceOutput } from '@/ai/schemas';

export async function predictMaintenance(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return predictMaintenanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMaintenancePrompt',
  input: { schema: PredictiveMaintenanceInputSchema },
  output: { schema: PredictiveMaintenanceOutputSchema },
  prompt: `You are an AI assistant for the Homewise app. Given the following information about a household machine, predict the next maintenance date and type of task required. Also, provide a recommended cost range for the task and urgency level (Low, Medium, High). Output in JSON format with fields: taskName, nextMaintenanceDate, estimatedCost, urgencyLevel.\n\nMachine Category: {{{category}}}\nBrand: {{{brand}}}\nModel: {{{model}}}\nLast Maintenance Date: {{{lastMaintenance}}}\nPurchase Date: {{{purchaseDate}}}\nUsage Frequency: {{{usageFrequency}}}\nWarranty Expiry: {{{warrantyExpiry}}}\n\n{{#if maintenanceHistory}}\nMaintenance History:\n{{#each maintenanceHistory}}\n- Task: {{{task}}}, Date: {{{date}}}, Cost: {{{cost}}}\n{{/each}}\n{{/if}}`,
});

const predictMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
