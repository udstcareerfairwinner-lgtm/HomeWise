import { z } from 'zod';

export const PredictiveMaintenanceInputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the machine (e.g., Vehicle, Kitchen Appliance).'
    ),
  brand: z.string().describe('The brand of the machine (e.g., Toyota, Samsung).'),
  model: z.string().describe('The model of the machine (e.g., Corolla 2020, RF28R7551SR).'),
  lastMaintenance: z
    .string()
    .describe('The date of the last maintenance (YYYY-MM-DD).'),
  purchaseDate: z
    .string()
    .describe('The purchase date of the machine (YYYY-MM-DD).'),
  usageFrequency: z
    .string()
    .describe('How often the machine is used (e.g., Daily, Weekly, Monthly).'),
  warrantyExpiry: z
    .string()
    .describe('The warranty expiry date of the machine (YYYY-MM-DD).'),
  maintenanceHistory: z
    .array(
      z.object({
        task: z
          .string()
          .describe('The maintenance task performed (e.g., Oil Change).'),
        date: z
          .string()
          .describe('The date the task was completed (YYYY-MM-DD).'),
        cost: z.number().describe('The cost of the maintenance task.'),
      })
    )
    .optional()
    .describe('History of maintenance tasks performed on the machine.'),
});

export type PredictiveMaintenanceInput = z.infer<
  typeof PredictiveMaintenanceInputSchema
>;

export const PredictiveMaintenanceOutputSchema = z.object({
  taskName: z.string().describe('The name of the recommended maintenance task.'),
  nextMaintenanceDate: z
    .string()
    .describe('The predicted date for the next maintenance (YYYY-MM-DD).'),
  estimatedCost: z
    .number()
    .describe('The estimated cost for the maintenance task.'),
  urgencyLevel: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The urgency level of the maintenance task.'),
});

export type PredictiveMaintenanceOutput = z.infer<
  typeof PredictiveMaintenanceOutputSchema
>;

export const MaintenanceRecommendationsInputSchema = z.object({
  category: z
    .string()
    .describe('The type of machine (e.g., car, fridge, AC).'),
  brand: z.string().describe('The brand of the machine.'),
  model: z.string().describe('The model of the machine.'),
  usageFrequency: z
    .string()
    .describe('How often the machine is used (e.g., daily, weekly, monthly).'),
  lastMaintenanceDate: z.string().describe('The date of the last maintenance.'),
  purchaseDate: z.string().describe('The date the machine was purchased.'),
  maintenanceHistory: z
    .array(
      z.object({
        task: z.string().describe('The maintenance task performed.'),
        date: z.string().describe('The date of the task.'),
        cost: z.number().describe('The cost of the task.'),
      })
    )
    .optional()
    .describe('The maintenance history of the machine.'),
  location: z
    .string()
    .optional()
    .describe(
      "The user's current location (e.g., city, address, or zip code) to find nearby service providers."
    ),
});

export type MaintenanceRecommendationsInput = z.infer<
  typeof MaintenanceRecommendationsInputSchema
>;

export const MaintenanceRecommendationsOutputSchema = z.object({
  costSavingTips: z
    .string()
    .describe(
      'AI-powered recommendations for saving costs on maintaining the machine.'
    ),
  recommendedServiceProviders: z
    .string()
    .describe(
      'Recommended nearby service providers for maintenance. If a location is provided, suggestions should be specific to that area.'
    ),
  estimatedRemainingLife: z
    .string()
    .describe('Estimated remaining useful life for the machine.'),
  criticalAttentionNeeded: z
    .string()
    .describe('Highlights if the machine needs critical attention.'),
});

export type MaintenanceRecommendationsOutput = z.infer<
  typeof MaintenanceRecommendationsOutputSchema
>;

const ChatHistorySchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const ChatInputSchema = z.object({
  message: z.string().describe("The user's message."),
  history: z.array(ChatHistorySchema).optional().describe('The chat history.'),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response message."),
});

export type ChatOutput = z.infer<typeof ChatOutputSchema>;
