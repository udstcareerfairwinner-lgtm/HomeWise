'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Lightbulb,
  Sparkles,
  Wrench,
  PlusCircle,
  Bot,
  LocateFixed,
  BarChart,
  Bell,
  PiggyBank,
  ShieldCheck,
  Smile,
} from 'lucide-react';
import { AiChat } from '@/components/chat/ai-chat';
import { machines } from '@/lib/data';
import DashboardPage from '@/components/dashboard/dashboard-page';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


export default function Dashboard() {
  // If there are machines, show the dashboard. Otherwise, show a welcome message to add a machine.
  if (machines && machines.length > 0) {
    return <DashboardPage />;
  }

  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
            You have no machines
            </h3>
            <p className="text-sm text-muted-foreground">
            You can start tracking maintenance as soon as you add a machine.
            </p>
            <Button className="mt-4" asChild>
                <Link href="/machines/add">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Machine
                </Link>
            </Button>
        </div>
    </div>
  );
}
