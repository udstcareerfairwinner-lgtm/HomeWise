
'use server';

/**
 * @fileOverview Implements the predictive maintenance flow for household machines.
 *
 * - predictMaintenance - Predicts the next maintenance task for a given machine.
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
export type { PredictiveMaintenanceInput };


export async function predictMaintenance(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return await predictMaintenanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMaintenancePrompt',
  input: { schema: PredictiveMaintenanceInputSchema },
  output: { schema: PredictiveMaintenanceOutputSchema },
  prompt: `You are an AI assistant for the Homewise app. Given the following information about a household machine, predict the next maintenance task, its due date, the estimated cost, and an urgency level (Low, Medium, or High).

Machine Information:
- Category: {{{category}}}
- Brand: {{{brand}}}
- Model: {{{model}}}
- Purchased: {{{purchaseDate}}}
- Warranty Expiry: {{{warrantyExpiry}}}
- Last Service: {{{lastMaintenance}}}
- Usage: {{{usageFrequency}}}
{{#if maintenanceHistory}}
- History: {{{maintenanceHistory}}}
{{/if}}

Your output must be a JSON object with the fields: taskName, nextMaintenanceDate, estimatedCost, and urgencyLevel.`,
});

const predictMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const { output } = await prompt.generate({
      input: input,
    });
    if (!output) {
        throw new Error('Could not generate a prediction.');
    }
    return output;
  }
);
