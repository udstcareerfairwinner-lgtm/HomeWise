
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
  const [isLocating, setIsLocating] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
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
        setLocation(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        toast({
          title: 'Location Found',
          description: 'Your current location has been set.',
        });
        setIsLocating(false);
      },
      () => {
        toast({
          variant: 'destructive',
          title: 'Unable to Retrieve Location',
          description: 'Please ensure location services are enabled in your browser.',
        });
        setIsLocating(false);
      }
    );
  };

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
        maintenanceHistory: machine.maintenanceHistory.map(h => ({ task: h.task, date: h.date, cost: h.cost })),
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
             <div className="flex gap-2">
                <Input 
                    id="dashboard-location"
                    placeholder="e.g., Mountain View, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={!selectedMachineId}
                />
                 <Button variant="outline" size="icon" onClick={handleUseCurrentLocation} disabled={!selectedMachineId || isLocating}>
                    {isLocating ? <Loader2 className="animate-spin" /> :<LocateFixed />}
                    <span className="sr-only">Use Current Location</span>
                </Button>
            </div>
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
        <Button onClick={handleRecommend} disabled={isLoading || isLocating || !selectedMachineId} className="w-full">
          {isLoading ? 'Generating...' : 'Get Recommendations'}
        </Button>
      </CardFooter>
    </Card>
  );
}
