'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Lightbulb } from 'lucide-react';
import type { Machine } from '@/lib/types';
import { runPredictiveMaintenance } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

type Prediction = {
  taskName: string;
  nextMaintenanceDate: string;
  estimatedCost: number;
  urgencyLevel: "Low" | "Medium" | "High";
};

type PredictiveMaintenanceProps = {
  machine: Machine;
  onPredict?: (prediction: Prediction) => void;
};

export function PredictiveMaintenance({ machine, onPredict }: PredictiveMaintenanceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const { toast } = useToast();
  
  const urgencyVariant = {
    High: 'destructive',
    Medium: 'default',
    Low: 'secondary',
  } as const;

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);
    
    try {
      const input = {
        category: machine.category,
        brand: machine.brand,
        model: machine.model,
        lastMaintenance: machine.lastMaintenance,
        purchaseDate: machine.purchaseDate,
        usageFrequency: machine.usageFrequency,
        warrantyExpiry: machine.warrantyExpiry,
        maintenanceHistory: machine.maintenanceHistory.map(h => ({ 
          task: h.task, 
          date: h.date, 
          cost: h.cost 
        })),
      };
      
      const result = await runPredictiveMaintenance(input);
      
      if (!result) {
        throw new Error('No prediction received from AI');
      }

      // Validate the prediction structure
      if (!result.taskName || !result.nextMaintenanceDate || result.estimatedCost === undefined) {
        throw new Error('Invalid prediction data received');
      }
      
      setPrediction(result);
      
      // Call the callback if provided
      if (onPredict) {
        onPredict(result);
      }

      toast({
        title: 'Prediction Generated',
        description: `Next maintenance: ${result.taskName}`,
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Could not generate a maintenance prediction. Please try again.';
      
      toast({
        variant: 'destructive',
        title: 'Prediction Failed',
        description: errorMessage,
      });
      console.error('Predictive Maintenance error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Predictive Maintenance
        </CardTitle>
        <CardDescription>
          Use AI to predict the next required maintenance task for this machine.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[120px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : prediction ? (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Next Task:</span>
              <span className="font-medium text-right flex-1 ml-4">
                {prediction.taskName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">{prediction.nextMaintenanceDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Est. Cost:</span>
              <span className="font-medium">
                ${typeof prediction.estimatedCost === 'number' 
                  ? prediction.estimatedCost.toFixed(2) 
                  : '0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Urgency:</span>
              <Badge variant={urgencyVariant[prediction.urgencyLevel] || 'default'}>
                {prediction.urgencyLevel}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-sm text-muted-foreground">
            Click the button below to get an AI-powered prediction.
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handlePredict} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Predicting...
            </>
          ) : (
            onPredict ? 'Predict & Set Reminder' : 'Predict Maintenance'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}