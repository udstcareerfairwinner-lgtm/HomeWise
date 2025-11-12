import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AddReminderForm } from '@/components/reminders/add-reminder-form';
import { Bell } from 'lucide-react';
import { maintenanceTasks } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function RemindersPage() {
  const upcomingReminders = maintenanceTasks.filter(
    (task) => task.status === 'Pending' && new Date(task.dueDate) > new Date()
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Add Reminder
          </CardTitle>
          <CardDescription>
            Set a new custom reminder for one of your machines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddReminderForm />
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Upcoming Reminders
          </CardTitle>
          <CardDescription>
            These are your next upcoming tasks.
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
    </div>
  );
}
