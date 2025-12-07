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
      validatedInput.error.errors
    );
    throw new Error(
      `Invalid input: ${validatedInput.error.errors.map(e => e.message).join(', ')}`
    );
  }

  try {
    console.log('Calling predictMaintenance with:', validatedInput.data);
    const result = await predictMaintenance(validatedInput.data);
    console.log('Received result:', result);

    if (!result) {
      throw new Error('No prediction result received from AI');
    }

    if (!result.taskName || !result.nextMaintenanceDate) {
      console.error('Incomplete result:', result);
      throw new Error('Incomplete prediction data received');
    }

    return result;
  } catch (error) {
    console.error('Error in runPredictiveMaintenance:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get predictive maintenance data.');
  }
}

export async function runAiRecommendations(
  input: MaintenanceRecommendationsInput
) {
  const validatedInput = MaintenanceRecommendationsInputSchema.safeParse(input);
  if (!validatedInput.success) {
    console.error(
      'Invalid input for AI recommendations:',
      validatedInput.error.errors
    );
    throw new Error(
      `Invalid input: ${validatedInput.error.errors.map(e => e.message).join(', ')}`
    );
  }

  try {
    console.log('Calling getMaintenanceRecommendations with:', validatedInput.data);
    const result = await getMaintenanceRecommendations(validatedInput.data);
    console.log('Received result:', result);

    if (!result) {
      throw new Error('No recommendations received from AI');
    }

    if (!result.costSavingTips || !result.recommendedServiceProviders) {
      console.error('Incomplete result:', result);
      throw new Error('Incomplete recommendation data received');
    }

    return result;
  } catch (error) {
    console.error('Error in runAiRecommendations:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get AI recommendations.');
  }
}

export async function runChat(input: ChatInput) {
  const validatedInput = ChatInputSchema.safeParse(input);
  if (!validatedInput.success) {
    console.error('Invalid input for chat:', validatedInput.error.errors);
    throw new Error(
      `Invalid chat input: ${validatedInput.error.errors.map(e => e.message).join(', ')}`
    );
  }

  try {
    const result = await chat(validatedInput.data);

    if (!result) {
      throw new Error('No chat response received');
    }

    return result;
  } catch (error) {
    console.error('Error in runChat:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to get chat response.');
  }
}