import type { Machine, MaintenanceTask } from './types';

export const machines: Machine[] = [
  {
    id: 'car-123',
    userId: 'user-abc',
    name: 'Family Sedan',
    category: 'Vehicle',
    brand: 'Toyota',
    model: 'Camry',
    serialNumber: '123-456-789',
    purchaseDate: '2022-01-15',
    warrantyExpiry: '2025-01-14',
    lastMaintenance: '2024-06-20',
    usageFrequency: 'Daily',
    maintenanceHistory: [
      {
        id: 'hist-1',
        task: 'Oil Change',
        date: '2024-06-20',
        cost: 75.00,
        vendor: 'Local Auto Shop'
      },
      {
        id: 'hist-2',
        task: 'Tire Rotation',
        date: '2023-12-15',
        cost: 40.00,
        vendor: 'Tire Center'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1722088354375-3c64b4d994b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzZWRhbiUyMGNhcnxlbnwwfHx8fDE3NjI4OTc2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'sedan car'
  },
  {
    id: 'fridge-456',
    userId: 'user-abc',
    name: 'Kitchen Refrigerator',
    category: 'Kitchen Appliance',
    brand: 'Samsung',
    model: 'RF28R7551SR',
    serialNumber: '987-654-321',
    purchaseDate: '2021-08-20',
    warrantyExpiry: '2023-08-19',
    lastMaintenance: '2024-02-10',
    usageFrequency: 'Daily',
    maintenanceHistory: [
        {
            id: 'hist-3',
            task: 'Clean Coils',
            date: '2024-02-10',
            cost: 0,
            vendor: 'DIY'
        }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1740803292374-1b167c1558b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8a2l0Y2hlbiUyMGFwcGxpYW5jZXxlbnwwfHx8fDE3NjI4ODkyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'kitchen appliance'
  },
  {
    id: 'ac-789',
    userId: 'user-abc',
    name: 'Central Air Conditioner',
    category: 'HVAC',
    brand: 'Trane',
    model: 'XL18i',
    purchaseDate: '2020-05-01',
    warrantyExpiry: '2030-04-30',
    lastMaintenance: '2024-04-05',
    usageFrequency: 'Daily',
    maintenanceHistory: [
      {
        id: 'hist-4',
        task: 'Annual Inspection',
        date: '2024-04-05',
        cost: 250,
        vendor: 'HVAC Services Inc.'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1601993198415-19d86ae28424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhaXIlMjBjb25kaXRpb25lcnxlbnwwfHx8fDE3NjI4NDU5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'air conditioner'
  }
];

export const maintenanceTasks: MaintenanceTask[] = [
  {
    id: 'task-1',
    machineId: 'car-123',
    taskName: 'Replace Air Filter',
    dueDate: '2024-08-15',
    status: 'Pending',
    estimatedCost: 30,
    urgencyLevel: 'Medium',
    notificationSent: false
  },
  {
    id: 'task-2',
    machineId: 'ac-789',
    taskName: 'Clean Filters',
    dueDate: '2024-07-30',
    status: 'Pending',
    estimatedCost: 0,
    urgencyLevel: 'High',
    notificationSent: false
  },
  {
    id: 'task-3',
    machineId: 'fridge-456',
    taskName: 'Check Water Filter',
    dueDate: '2024-09-01',
    status: 'Pending',
    estimatedCost: 50,
    urgencyLevel: 'Low',
    notificationSent: false
  },
  {
    id: 'task-4',
    machineId: 'car-123',
    taskName: 'Check Tire Pressure',
    dueDate: '2024-07-25',
    status: 'Pending',
    estimatedCost: 0,
    urgencyLevel: 'Low',
    notificationSent: false
  }
];
