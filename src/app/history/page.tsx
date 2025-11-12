import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance History</CardTitle>
        <CardDescription>A complete log of all maintenance tasks.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This page will show a detailed history of all maintenance activities across all your machines. You will be able to search, filter, and export this data.</p>
      </CardContent>
    </Card>
  );
}
