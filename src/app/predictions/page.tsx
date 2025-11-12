'use client';

import { useState } from 'react';
import Image from 'next/image';
import { machines } from '@/lib/data';
import type { Machine } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PredictiveMaintenance } from '@/components/machines/predictive-maintenance';
import { AiRecommendations } from '@/components/machines/ai-recommendations';
import { Calendar, Tag, Wrench, ShieldCheck, History as HistoryIcon, Hash, Zap, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PredictionsPage() {
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePrediction = (prediction: any) => {
    // In a real app, you would add this to a global state or database
    console.log("New prediction to be added as a reminder:", prediction);
    toast({
        title: "Reminder Created",
        description: `Automatic reminder for "${prediction.taskName}" has been set.`,
    });
  }

  const selectedMachine = machines.find((m) => m.id === selectedMachineId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            AI Predictions & Recommendations
          </CardTitle>
          <CardDescription>
            Select a machine to run predictive maintenance and get AI-powered insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedMachineId} defaultValue={selectedMachineId || undefined}>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select a machine..." />
            </SelectTrigger>
            <SelectContent>
              {machines.map((machine: Machine) => (
                <SelectItem key={machine.id} value={machine.id}>
                  {machine.name} ({machine.brand} {machine.model})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedMachine ? (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-3xl font-bold">{selectedMachine.name}</CardTitle>
                            <CardDescription>{selectedMachine.brand} {selectedMachine.model}</CardDescription>
                        </div>
                        <Badge variant="outline">{selectedMachine.category}</Badge>
                    </div>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="relative aspect-video">
                            <Image
                            src={selectedMachine.imageUrl}
                            alt={selectedMachine.name}
                            fill
                            className="rounded-md object-cover"
                            data-ai-hint={selectedMachine.imageHint}
                            />
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span>Brand: <span className="font-medium">{selectedMachine.brand}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-muted-foreground" />
                                <span>Model: <span className="font-medium">{selectedMachine.model}</span></span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span>S/N: <span className="font-medium">{selectedMachine.serialNumber || 'N/A'}</span></span>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Purchased: <span className="font-medium">{selectedMachine.purchaseDate}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                <span>Warranty: <span className="font-medium">Expires {selectedMachine.warrantyExpiry}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wrench className="h-4 w-4 text-muted-foreground" />
                                <span>Last Service: <span className="font-medium">{selectedMachine.lastMaintenance}</span></span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-muted-foreground" />
                                <span>Usage: <span className="font-medium">{selectedMachine.usageFrequency}</span></span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <PredictiveMaintenance machine={selectedMachine} onPredict={handlePrediction} />
                <AiRecommendations machine={selectedMachine} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-96">
            <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    No machine selected
                </h3>
                <p className="text-sm text-muted-foreground">
                    Please select a machine above to see its details and AI predictions.
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
