'use server';

import { predictMaintenance, PredictiveMaintenanceInput } from '@/ai/flows/predictive-maintenance';
import { getMaintenanceRecommendations, MaintenanceRecommendationsInput } from '@/ai/flows/ai-maintenance-recommendations';
import { z } from 'zod';

const predictiveMaintenanceActionSchema = z.object({
  category: z.string(),
  brand: z.string(),
  model: z.string(),
  lastMaintenance: z.string(),
  purchaseDate: z.string(),
  usageFrequency: z.string(),
  warrantyExpiry: z.string(),
  maintenanceHistory: z.array(z.object({
    task: z.string(),
    date: z.string(),
    cost: z.number(),
  })).optional(),
});

export async function runPredictiveMaintenance(input: PredictiveMaintenanceInput) {
    const validatedInput = predictiveMaintenanceActionSchema.safeParse(input);
    if (!validatedInput.success) {
        throw new Error('Invalid input for predictive maintenance.');
    }
    try {
        const result = await predictMaintenance(validatedInput.data);
        return result;
    } catch (error) {
        console.error("Error in runPredictiveMaintenance:", error);
        throw new Error('Failed to get predictive maintenance data.');
    }
}


const aiRecommendationsActionSchema = z.object({
    machineType: z.string(),
    brand: z.string(),
    model: z.string(),
    usageFrequency: z.string(),
    lastMaintenanceDate: z.string(),
    purchaseDate: z.string(),
    maintenanceHistory: z.string(),
});

export async function runAiRecommendations(input: MaintenanceRecommendationsInput) {
    const validatedInput = aiRecommendationsActionSchema.safeParse(input);
    if (!validatedInput.success) {
        throw new Error('Invalid input for AI recommendations.');
    }
    try {
        const result = await getMaintenanceRecommendations(validatedInput.data);
        return result;
    } catch (error) {
        console.error("Error in runAiRecommendations:", error);
        throw new Error('Failed to get AI recommendations.');
    }
}
