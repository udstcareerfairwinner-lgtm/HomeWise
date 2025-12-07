
'use server';

/**
 * @fileOverview Implements the predictive maintenance flow for household machines.
 *
 * - predictMaintenance - Predicts the next maintenance task for a given machine.
 * - PredictiveMaintenanceInput - The input type for the predictMaintenance function.
 * - PredictiveMaintenanceOutput - The return type for the predictMaintenance function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {
    PredictiveMaintenanceInputSchema,
    PredictiveMaintenanceOutputSchema,
    type PredictiveMaintenanceInput,
    type PredictiveMaintenanceOutput
} from '@/ai/schemas';

export type { PredictiveMaintenanceInput, PredictiveMaintenanceOutput };


export async function predictMaintenance(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  const result = await predictMaintenanceFlow(input);
  if (!result) {
    throw new Error('No prediction result received from AI');
  }
  return result;
}

const promptTemplate = "You are an AI assistant for the Homewise app. Given the following information about a household machine, predict the next maintenance task, its due date, the estimated cost, and an urgency level (Low, Medium, or High).\n\nMachine Information:\n- Category: {{category}}\n- Brand: {{brand}}\n- Model: {{model}}\n- Purchased: {{purchaseDate}}\n- Warranty Expiry: {{warrantyExpiry}}\n- Last Service: {{lastMaintenance}}\n- Usage: {{usageFrequency}}\n{{#if maintenanceHistory}}\n- Maintenance History (JSON String): {{{maintenanceHistory}}}\n{{/if}}\n\nYour output must be a JSON object with the fields: taskName, nextMaintenanceDate, estimatedCost, and urgencyLevel.";

const prompt = ai.definePrompt({
  name: 'predictMaintenancePrompt',
  input: { schema: PredictiveMaintenanceInputSchema },
  output: { schema: PredictiveMaintenanceOutputSchema },
  model: googleAI.model('gemini-1.5-flash'),
}, promptTemplate);

const predictMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const { output } = await prompt({
        ...input,
        maintenanceHistory: JSON.stringify(input.maintenanceHistory)
    });
    
    if (!output) {
        throw new Error('Could not generate a prediction.');
    }
    return output;
  }
);
