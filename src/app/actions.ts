
'use server';

import {
  predictMaintenance,
} from '@/ai/flows/predictive-maintenance';
import {
  getMaintenanceRecommendations,
} from '@/ai/flows/ai-maintenance-recommendations';
import { chat, ChatInput } from '@/ai/flows/chat';
import {
  PredictiveMaintenanceInputSchema,
  MaintenanceRecommendationsInputSchema,
  ChatInputSchema,
  type PredictiveMaintenanceInput,
  type MaintenanceRecommendationsInput,
} from '@/ai/schemas';

export async function runPredictiveMaintenance(input: PredictiveMaintenanceInput) {
  const validatedInput = PredictiveMaintenanceInputSchema.safeParse(input);
  if (!validatedInput.success) {
    console.error(
      'Invalid input for predictive maintenance:',
      validatedInput.error
    );
    throw new Error('Invalid input for predictive maintenance.');
  }
  try {
    const result = await predictMaintenance({
      ...validatedInput.data,
      // @ts-ignore
      maintenanceHistory: JSON.stringify(validatedInput.data.maintenanceHistory),
    });
    return result;
  } catch (error) {
    console.error('Error in runPredictiveMaintenance:', error);
    throw new Error('Failed to get predictive maintenance data.');
  }
}

export async function runAiRecommendations(
  input: MaintenanceRecommendationsInput
) {
  const validatedInput =
    MaintenanceRecommendationsInputSchema.safeParse(input);
  if (!validatedInput.success) {
    console.error(
      'Invalid input for AI recommendations:',
      validatedInput.error
    );
    throw new Error('Invalid input for AI recommendations.');
  }
  try {
    const result = await getMaintenanceRecommendations({
      ...validatedInput.data,
      // @ts-ignore
      maintenanceHistory: JSON.stringify(validatedInput.data.maintenanceHistory),
    });
    return result;
  } catch (error) {
    console.error('Error in runAiRecommendations:', error);
    throw new Error('Failed to get AI recommendations.');
  }
}

export async function runChat(input: ChatInput) {
  const validatedInput = ChatInputSchema.safeParse(input);
  if (!validatedInput.success) {
    throw new Error('Invalid input for chat.');
  }
  try {
    const result = await chat(validatedInput.data);
    return result;
  } catch (error) {
    console.error('Error in runChat:', error);
    throw new Error('Failed to get chat response.');
  }
}
