'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { machines } from '@/lib/data';
import { differenceInDays, parseISO, format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export function WarrantyStatus() {
  const today = new Date();
  const expiringSoon = machines.filter((machine) => {
    const expiryDate = parseISO(machine.warrantyExpiry);
    const daysLeft = differenceInDays(expiryDate, today);
    return daysLeft > 0 && daysLeft <= 90;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Warranty Status
        </CardTitle>
        <CardDescription>Warranties that are expiring soon.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expiringSoon.length > 0 ? (
          expiringSoon.map((machine) => {
            const expiryDate = parseISO(machine.warrantyExpiry);
            const daysLeft = differenceInDays(expiryDate, today);
            return (
              <div
                key={machine.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{machine.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Expires on {format(expiryDate, 'MMM d, yyyy')}
                  </p>
                </div>
                <Badge variant="destructive">
                  {daysLeft} days left
                </Badge>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground h-24">
             <ShieldCheck className="h-8 w-8 mb-2" />
            <p>No warranties expiring in the next 90 days.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
