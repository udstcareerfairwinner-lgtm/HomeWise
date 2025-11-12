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

export function PredictiveMaintenance({ machine }: { machine: Machine }) {
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
        maintenanceHistory: machine.maintenanceHistory.map(h => ({ task: h.task, date: h.date, cost: h.cost })),
      };
      const result = await runPredictiveMaintenance(input);
      setPrediction(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Prediction Failed',
        description:
          'Could not generate a maintenance prediction. Please try again.',
      });
      console.error(error);
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
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Task:</span>
              <span className="font-medium">{prediction.taskName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">{prediction.nextMaintenanceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Cost:</span>
              <span className="font-medium">${prediction.estimatedCost.toFixed(2)}</span>
            </div>
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Urgency:</span>
              <Badge variant={urgencyVariant[prediction.urgencyLevel]}>
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
            'Predict Next Task'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
