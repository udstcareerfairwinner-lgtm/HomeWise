'use server';

/**
 * @fileOverview Implements the predictive maintenance flow for household machines.
 *
 * - predictMaintenance - Predicts the next maintenance date and task for a given machine.
 * - PredictiveMaintenanceInput - The input type for the predictMaintenance function.
 * - PredictiveMaintenanceOutput - The return type for the predictMaintenance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  category: z.string().describe('The category of the machine (e.g., Vehicle, Kitchen Appliance).'),
  brand: z.string().describe('The brand of the machine (e.g., Toyota, Samsung).'),
  model: z.string().describe('The model of the machine (e.g., Corolla 2020, RF28R7551SR).'),
  lastMaintenance: z.string().describe('The date of the last maintenance (YYYY-MM-DD).'),
  purchaseDate: z.string().describe('The purchase date of the machine (YYYY-MM-DD).'),
  usageFrequency: z.string().describe('How often the machine is used (e.g., Daily, Weekly, Monthly).'),
  warrantyExpiry: z.string().describe('The warranty expiry date of the machine (YYYY-MM-DD).'),
  maintenanceHistory: z.array(
    z.object({
      task: z.string().describe('The maintenance task performed (e.g., Oil Change).'),
      date: z.string().describe('The date the task was completed (YYYY-MM-DD).'),
      cost: z.number().describe('The cost of the maintenance task.'),
    })
  ).optional().describe('History of maintenance tasks performed on the machine.'),
});

export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  taskName: z.string().describe('The name of the recommended maintenance task.'),
  nextMaintenanceDate: z.string().describe('The predicted date for the next maintenance (YYYY-MM-DD).'),
  estimatedCost: z.number().describe('The estimated cost for the maintenance task.'),
  urgencyLevel: z.enum(['Low', 'Medium', 'High']).describe('The urgency level of the maintenance task.'),
});

export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

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
