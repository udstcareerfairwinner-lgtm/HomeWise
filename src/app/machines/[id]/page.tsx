import { notFound } from 'next/navigation';
import Image from 'next/image';
import { machines } from '@/lib/data';
import type { Machine } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { PredictiveMaintenance } from '@/components/machines/predictive-maintenance';
import { AiRecommendations } from '@/components/machines/ai-recommendations';
import { Calendar, Tag, Wrench, ShieldCheck, History as HistoryIcon, Hash, Zap } from 'lucide-react';

const getMachine = (id: string): Machine | undefined => {
  return machines.find((m) => m.id === id);
};

export default function MachineDetailPage({ params }: { params: { id: string } }) {
  const machine = getMachine(params.id);

  if (!machine) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-3xl font-bold">{machine.name}</CardTitle>
                        <CardDescription>{machine.brand} {machine.model}</CardDescription>
                    </div>
                    <Badge variant="outline">{machine.category}</Badge>
                </div>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="relative aspect-video">
                        <Image
                        src={machine.imageUrl}
                        alt={machine.name}
                        fill
                        className="rounded-md object-cover"
                        data-ai-hint={machine.imageHint}
                        />
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span>Brand: <span className="font-medium">{machine.brand}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span>Model: <span className="font-medium">{machine.model}</span></span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span>S/N: <span className="font-medium">{machine.serialNumber || 'N/A'}</span></span>
                        </div>
                        <Separator />
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Purchased: <span className="font-medium">{machine.purchaseDate}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                            <span>Warranty: <span className="font-medium">Expires {machine.warrantyExpiry}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span>Last Service: <span className="font-medium">{machine.lastMaintenance}</span></span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span>Usage: <span className="font-medium">{machine.usageFrequency}</span></span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <PredictiveMaintenance machine={machine} />
            <AiRecommendations machine={machine} />
        </div>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            Maintenance History
          </CardTitle>
          <CardDescription>
            A log of all maintenance tasks performed on this machine.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machine.maintenanceHistory.length > 0 ? (
                machine.maintenanceHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.task}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.vendor || 'DIY'}</TableCell>
                    <TableCell className="text-right">
                      ${item.cost.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No maintenance history found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
