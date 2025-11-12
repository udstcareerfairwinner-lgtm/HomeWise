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
import { runAiRecommendations } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { machines } from '@/lib/data';
import type { Machine } from '@/lib/types';
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

export function AiDashboardRecommendations() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const { toast } = useToast();

  const handleRecommend = async () => {
    if (!selectedMachineId) {
      toast({
        variant: 'destructive',
        title: 'No Machine Selected',
        description: 'Please select a machine to get recommendations.',
      });
      return;
    }
    const machine = machines.find(m => m.id === selectedMachineId);
    if (!machine) return;

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
  
  const selectedMachine = machines.find(m => m.id === selectedMachineId);

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
        <Select onValueChange={setSelectedMachineId} defaultValue={selectedMachineId || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select a machine..." />
          </SelectTrigger>
          <SelectContent>
            {machines.map((machine: Machine) => (
              <SelectItem key={machine.id} value={machine.id}>
                {machine.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="space-y-2">
            <Label htmlFor="dashboard-location">Your Location</Label>
            <Input 
                id="dashboard-location"
                placeholder="e.g., Mountain View, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={!selectedMachineId}
            />
        </div>

        <div className="min-h-[150px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recommendation ? (
             <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
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
              Select a machine, enter a location, and click below.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRecommend} disabled={isLoading || !selectedMachineId} className="w-full">
          {isLoading ? 'Generating...' : 'Get Recommendations'}
        </Button>
      </CardFooter>
    </Card>
  );
}
