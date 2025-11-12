import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AddMachineForm } from '@/components/machines/add-machine-form';

export default function AddMachinePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a New Machine</CardTitle>
        <CardDescription>
          Fill out the details below to add a new machine to your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AddMachineForm />
      </CardContent>
    </Card>
  );
}
