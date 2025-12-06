'use server';

import { predictMaintenance, PredictiveMaintenanceInput } from '@/ai/flows/predictive-maintenance';
import { getMaintenanceRecommendations, MaintenanceRecommendationsInput } from '@/ai/flows/ai-maintenance-recommendations';
import { chat, ChatInput } from '@/ai/flows/chat';
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
    location: z.string().optional(),
});

export async function runAiRecommendations(input: MaintenanceRecommendationsInput) {
    const validatedInput = aiRecommendationsActionSchema.safeParse(input);
    if (!validatedInput.success) {
        console.error('Invalid input for AI recommendations:', validatedInput.error);
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

const chatActionSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
});

export async function runChat(input: ChatInput) {
    const validatedInput = chatActionSchema.safeParse(input);
    if (!validatedInput.success) {
        throw new Error('Invalid input for chat.');
    }
    try {
        const result = await chat(validatedInput.data);
        return result;
    } catch (error) {
        console.error("Error in runChat:", error);
        throw new Error('Failed to get chat response.');
    }
}
