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
import { Loader2, Sparkles, LocateFixed } from 'lucide-react';
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
  const [isLocating, setIsLocating] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [location, setLocation] = useState('');
  const { toast } = useToast();

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Store coordinates in a clean format for the AI
        setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        toast({
          title: 'Location Found',
          description: 'Your current location has been set.',
        });
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = 'Please ensure location services are enabled in your browser.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location access was denied. Please enable it in your browser settings.';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location request timed out. Please try again.';
        }
        
        toast({
          variant: 'destructive',
          title: 'Unable to Retrieve Location',
          description: errorMessage,
        });
        setIsLocating(false);
      },
      {
        timeout: 10000, // 10 second timeout
        enableHighAccuracy: true
      }
    );
  };

  const handleRecommend = async () => {
    if (!location.trim()) {
      toast({
        variant: 'destructive',
        title: 'Location Required',
        description: 'Please enter your location or use current location.',
      });
      return;
    }

    setIsLoading(true);
    setRecommendation(null);
    
    try {
      const input = {
        category: machine.category,
        brand: machine.brand,
        model: machine.model,
        usageFrequency: machine.usageFrequency,
        lastMaintenanceDate: machine.lastMaintenance,
        purchaseDate: machine.purchaseDate,
        maintenanceHistory: machine.maintenanceHistory.map(h => ({ 
          task: h.task, 
          date: h.date, 
          cost: h.cost 
        })),
        location: location.trim(),
      };
      
      const result = await runAiRecommendations(input);
      
      if (!result) {
        throw new Error('No recommendations received');
      }
      
      setRecommendation(result);
      
      toast({
        title: 'Success',
        description: 'AI recommendations generated successfully.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Could not generate AI recommendations. Please try again.';
      
      toast({
        variant: 'destructive',
        title: 'Recommendation Failed',
        description: errorMessage,
      });
      console.error('AI Recommendation error:', error);
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
          <div className="flex gap-2">
            <Input 
              id="location"
              placeholder="e.g., Mountain View, CA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading || isLocating}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleUseCurrentLocation} 
              disabled={isLocating || isLoading}
              title="Use current location"
            >
              {isLocating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LocateFixed className="h-4 w-4" />
              )}
              <span className="sr-only">Use Current Location</span>
            </Button>
          </div>
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
                <AccordionContent className="whitespace-pre-wrap">
                  {recommendation.costSavingTips}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Service Providers</AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap">
                  {recommendation.recommendedServiceProviders}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Estimated Life</AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap">
                  {recommendation.estimatedRemainingLife}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-destructive">
                  Critical Attention
                </AccordionTrigger>
                <AccordionContent className="whitespace-pre-wrap">
                  {recommendation.criticalAttentionNeeded}
                </AccordionContent>
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
        <Button 
          onClick={handleRecommend} 
          disabled={isLoading || isLocating} 
          className="w-full"
        >
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