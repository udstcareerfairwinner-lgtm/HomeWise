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
import { Loader2, Sparkles } from 'lucide-react';
import type { Machine } from '@/lib/types';
import { runAiRecommendations } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '../ui/input';
import { Label } from '../ui/label';


type Recommendation = {
  costSavingTips: string;
  recommendedServiceProviders: string;
  estimatedRemainingLife: string;
  criticalAttentionNeeded: string;
};

export function AiRecommendations({ machine }: { machine: Machine }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [location, setLocation] = useState('');
  const { toast } = useToast();

  const handleRecommend = async () => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const input = {
        machineType: machine.category,
        brand: machine.brand,
        model: machine.model,
        usageFrequency: machine.usageFrequency,
        lastMaintenanceDate: machine.lastMaintenance,
        purchaseDate: machine.purchaseDate,
        maintenanceHistory: machine.maintenanceHistory.map(h => `${h.date}: ${h.task} ($${h.cost})`).join(', ') || 'None',
        location,
      };
      const result = await runAiRecommendations(input);
      setRecommendation(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Recommendation Failed',
        description: 'Could not generate AI recommendations. Please try again.',
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
          <Sparkles className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
        <CardDescription>
          Get AI insights for cost-saving, service providers, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="location">Your Location (for nearby services)</Label>
            <Input 
                id="location"
                placeholder="e.g., Mountain View, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </div>
        <div className="min-h-[120px]">
            {isLoading ? (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            ) : recommendation ? (
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                <AccordionTrigger>Cost Saving Tips</AccordionTrigger>
                <AccordionContent>{recommendation.costSavingTips}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger>Service Providers</AccordionTrigger>
                <AccordionContent>{recommendation.recommendedServiceProviders}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                <AccordionTrigger>Estimated Life</AccordionTrigger>
                <AccordionContent>{recommendation.estimatedRemainingLife}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                <AccordionTrigger className="text-destructive">Critical Attention</AccordionTrigger>
                <AccordionContent>{recommendation.criticalAttentionNeeded}</AccordionContent>
                </AccordionItem>
            </Accordion>
            ) : (
            <div className="flex items-center justify-center h-full text-center text-sm text-muted-foreground">
                Enter your location and click below for AI recommendations.
            </div>
            )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRecommend} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Get Recommendations'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
