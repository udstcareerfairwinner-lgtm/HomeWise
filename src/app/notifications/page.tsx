import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { maintenanceTasks } from '@/lib/data';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NotificationsPage() {
  const upcomingReminders = maintenanceTasks.filter(
    (task) => task.status === 'Pending' && new Date(task.dueDate) > new Date()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Upcoming Reminders
        </CardTitle>
        <CardDescription>
          Here are your upcoming maintenance tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingReminders.length > 0 ? (
          upcomingReminders.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-semibold">{task.taskName}</p>
                <p className="text-sm text-muted-foreground">
                  Due on {task.dueDate}
                </p>
              </div>
              <Badge variant={task.urgencyLevel === 'High' ? 'destructive' : 'secondary'}>
                {task.urgencyLevel}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No upcoming reminders.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
