export type MachineCategory =
  | 'Vehicle'
  | 'Kitchen Appliance'
  | 'HVAC'
  | 'Garden'
  | 'Electronics'
  | 'Laundry'
  | 'Other';

export type MaintenanceUrgency = 'Low' | 'Medium' | 'High';
export type MaintenanceStatus = 'Pending' | 'Completed' | 'Overdue';

export type MaintenanceHistory = {
  id: string;
  task: string;
  date: string;
  cost: number;
  vendor?: string;
  notes?: string;
};

export interface Machine {
  id: string;
  userId: string;
  name: string;
  category: MachineCategory;
  brand: string;
  model: string;
  serialNumber?: string;
  purchaseDate: string;
  warrantyExpiry: string;
  lastMaintenance: string;
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rarely';
  maintenanceHistory: MaintenanceHistory[];
  imageUrl: string;
  imageHint: string;
}

export interface MaintenanceTask {
  id: string;
  machineId: string;
  taskName: string;
  dueDate: string;
  status: MaintenanceStatus;
  estimatedCost: number;
  urgencyLevel: MaintenanceUrgency;
  notificationSent: boolean;
}
