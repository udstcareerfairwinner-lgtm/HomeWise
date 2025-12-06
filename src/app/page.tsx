
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
  Lightbulb,
  LocateFixed,
  BarChart,
  Bell,
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

const features = [
    {
        icon: <Lightbulb className="h-10 w-10 text-primary" />,
        title: "AI Predictive Maintenance",
        description: "Leverage AI to predict when your machines will need service, before they break down."
    },
    {
        icon: <Sparkles className="h-10 w-10 text-primary" />,
        title: "Intelligent Recommendations",
        description: "Get smart suggestions for cost-saving, estimated machine life, and critical alerts."
    },
     {
        icon: <LocateFixed className="h-10 w-10 text-primary" />,
        title: "Nearby Service Providers",
        description: "Find trusted and reliable local service centers for your specific maintenance needs."
    },
    {
        icon: <Wrench className="h-10 w-10 text-primary" />,
        title: "Centralized Management",
        description: "Track all your vehicles, appliances, and machines in one organized dashboard."
    },
    {
        icon: <Bell className="h-10 w-10 text-primary" />,
        title: "Automatic Reminders",
        description: "Set custom reminders or let our AI automatically create them based on predictions."
    },
    {
        icon: <BarChart className="h-10 w-10 text-primary" />,
        title: "History & Cost Tracking",
        description: "Maintain a complete log of all maintenance tasks, costs, and service history."
    },
]

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
      <div className="bg-gradient-to-b from-background to-muted/40 text-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
            <Wrench className="mx-auto h-16 w-16 text-primary" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome to HomeCare AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                The smart way to manage maintenance for every machine in your life. Stop guessing, start predicting. Add your first machine to unlock AI-powered insights and never miss a maintenance task again.
            </p>
            <div className="mt-10">
                <Button asChild size="lg">
                    <Link href="/machines/add">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add Your First Machine
                    </Link>
                </Button>
            </div>
        </div>

        <div className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Features to Keep Your Home Running Smoothly</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Everything you need to take control of your home maintenance.</p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
                            {feature.icon}
                            <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
         <div className="py-20">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
                 <div className="mt-12 grid gap-10 md:grid-cols-3">
                    <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">1</div>
                        <h3 className="mt-5 text-xl font-semibold">Add Your Machine</h3>
                        <p className="mt-2 text-muted-foreground">Easily add any vehicle or appliance, from your car to your dishwasher.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">2</div>
                        <h3 className="mt-5 text-xl font-semibold">Get AI Predictions</h3>
                        <p className="mt-2 text-muted-foreground">Run our AI to predict the next maintenance task, cost, and urgency.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">3</div>
                        <h3 className="mt-5 text-xl font-semibold">Stay Organized</h3>
                        <p className="mt-2 text-muted-foreground">Receive reminders and view all your upcoming tasks on a clean dashboard.</p>
                    </div>
                 </div>
                 <div className="mt-16">
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/machines/add">
                        Get Started for Free
                        </Link>
                    </Button>
                </div>
            </div>
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
