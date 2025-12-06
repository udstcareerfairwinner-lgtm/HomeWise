import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { CostSummaryChart } from '@/components/dashboard/cost-summary-chart';
import { machines, maintenanceTasks } from '@/lib/data';
import type { Machine } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AiDashboardRecommendations } from '@/components/dashboard/ai-dashboard-recommendations';

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
    
  if (machines.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg bg-background p-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Wrench className="h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to HomeCare AI
          </h1>
          <p className="text-lg text-muted-foreground">
            The smart way to manage maintenance for every machine in your life. Stop guessing, start predicting. Add your first machine to unlock AI-powered insights and never miss a maintenance task again.
          </p>
          <Button asChild size="lg" className="mt-4">
            <Link href="/machines/add">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Your First Machine
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Urgency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingTasks.map((task) => {
                const machine = machines.find((m) => m.id === task.machineId);
                return (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">
                      {machine?.name || 'N/A'}
                    </TableCell>
                    <TableCell>{task.taskName}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={urgencyVariant[task.urgencyLevel]}
                        className="w-[68px] justify-center"
                      >
                        {task.urgencyLevel}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AiDashboardRecommendations />
      
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

      <Card className="lg:col-span-2">
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
    </div>
  );
}
