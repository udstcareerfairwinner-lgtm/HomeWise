'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  AlertTriangle,
  CircleDollarSign,
  CarFront,
  Refrigerator,
  WashingMachine,
  AirVent,
  Wrench,
  Bot,
} from 'lucide-react';
import { CostSummaryChart } from '@/components/dashboard/cost-summary-chart';
import { machines, maintenanceTasks } from '@/lib/data';
import type { Machine } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { WarrantyStatus } from '@/components/dashboard/warranty-status';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AiChat } from '../chat/ai-chat';

const getMachineIcon = (category: Machine['category']) => {
  switch (category) {
    case 'Vehicle':
      return <CarFront className="h-6 w-6 text-muted-foreground" />;
    case 'Kitchen Appliance':
      return <Refrigerator className="h-6 w-6 text-muted-foreground" />;
    case 'Laundry':
      return <WashingMachine className="h-6 w-6 text-muted-foreground" />;
    case 'HVAC':
      return <AirVent className="h-6 w-6 text-muted-foreground" />;
    default:
      return <Wrench className="h-6 w-6 text-muted-foreground" />;
  }
};

const urgencyVariant = {
  High: 'destructive',
  Medium: 'default',
  Low: 'secondary',
} as const;


export default function DashboardPage() {
  const upcomingTasks = maintenanceTasks
    .filter((task) => task.status === 'Pending')
    .slice(0, 5);

  const machinesNeedingAttention = machines
    .filter((m) =>
      maintenanceTasks.some(
        (t) => t.machineId === m.id && t.urgencyLevel === 'High'
      )
    )
    .slice(0, 3);
    

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Full-width row for upcoming tasks */}
      <div className="lg:col-span-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Maintenance
                </CardTitle>
                <CardDescription>
                  Tasks that are due soon. Stay on top of your schedule!
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="hidden md:block">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[30%]">Machine</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[40%]">Task</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[20%]">Due Date</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right w-[10%]">Urgency</th>
                        </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                        {upcomingTasks.map((task) => {
                            const machine = machines.find((m) => m.id === task.machineId);
                            return (
                            <tr key={task.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium truncate">
                                {machine?.name || 'N/A'}
                                </td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 truncate">{task.taskName}</td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{task.dueDate}</td>
                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                <Badge
                                    variant={urgencyVariant[task.urgencyLevel]}
                                    className="w-[68px] justify-center"
                                >
                                    {task.urgencyLevel}
                                </Badge>
                                </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
              </div>

               <div className="grid gap-4 md:hidden">
                {upcomingTasks.length > 0 ? (
                    upcomingTasks.map((task) => {
                         const machine = machines.find((m) => m.id === task.machineId);
                         return (
                            <div key={task.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{task.taskName}</p>
                                        <p className="text-sm text-muted-foreground">{machine?.name || 'N/A'}</p>
                                    </div>
                                    <Badge variant={urgencyVariant[task.urgencyLevel]} className="shrink-0">{task.urgencyLevel}</Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Due: {task.dueDate}
                                </div>
                            </div>
                         )
                    })
                ) : (
                  <p className="text-center text-muted-foreground">No upcoming tasks.</p>
                )}
              </div>
            </CardContent>
        </Card>
      </div>

      {/* Three-column section for summaries */}
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Machines Needing Attention
            </CardTitle>
            <CardDescription>
                These items require your immediate attention.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            {machinesNeedingAttention.length > 0 ? (
                machinesNeedingAttention.map((machine) => (
                <div
                    key={machine.id}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage
                        src={machine.imageUrl}
                        alt={machine.name}
                        data-ai-hint={machine.imageHint}
                        />
                        <AvatarFallback>
                        {getMachineIcon(machine.category)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{machine.name}</p>
                        <p className="text-sm text-muted-foreground">
                        {machine.model}
                        </p>
                    </div>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                </div>
                ))
            ) : (
                <p className="text-sm text-muted-foreground">
                All machines are looking good!
                </p>
            )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5" />
                Cost & Savings Summary
            </CardTitle>
            <CardDescription>
                Monthly maintenance expenses and estimated savings.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <CostSummaryChart />
            </CardContent>
        </Card>
        
        <WarrantyStatus />

      {/* Full-width row for AI Chat */}
      <div className="lg:col-span-3">
        <Dialog>
            <DialogTrigger asChild>
              <Card className="text-center p-8 cursor-pointer hover:bg-card/80 transition-colors shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Bot className="h-8 w-8" />
                    Ask Our AI Assistant
                  </CardTitle>
                  <CardDescription className="text-base">
                    Click here to start a conversation about appliance maintenance, troubleshooting, or anything else.
                  </CardDescription>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                    <Bot />
                    AI Assistant
                    </DialogTitle>
                    <DialogDescription>
                    Ask any question about home appliance maintenance.
                    </DialogDescription>
                </DialogHeader>
                <AiChat />
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
