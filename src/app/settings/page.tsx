import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account and application settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This page will contain settings for your profile, notifications, data export, and other application preferences.</p>
      </CardContent>
    </Card>
  );
}
