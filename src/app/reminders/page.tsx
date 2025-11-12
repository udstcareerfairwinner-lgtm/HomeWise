import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function RemindersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Maintenance Reminders
        </CardTitle>
        <CardDescription>Manage and set custom reminders for your machines.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This page will allow you to set up, view, and manage all maintenance reminders. You'll be able to create custom alerts for specific tasks, ensuring you never miss an important maintenance activity.</p>
      </CardContent>
    </Card>
  );
}
