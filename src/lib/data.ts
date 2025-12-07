import type { Machine, MaintenanceTask } from './types';
import { PlaceHolderImages } from './placeholder-images';

const carImage = PlaceHolderImages.find(img => img.id === 'car');
const fridgeImage = PlaceHolderImages.find(img => img.id === 'refrigerator');
const acImage = PlaceHolderImages.find(img => img.id === 'ac-unit');


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
    imageUrl: carImage?.imageUrl || 'https://picsum.photos/seed/1/600/400',
    imageHint: carImage?.imageHint || 'sedan car'
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
    imageUrl: fridgeImage?.imageUrl || 'https://picsum.photos/seed/2/600/400',
    imageHint: fridgeImage?.imageHint || 'kitchen appliance'
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
    imageUrl: acImage?.imageUrl || 'https://picsum.photos/seed/3/600/400',
    imageHint: acImage?.imageHint || 'air conditioner'
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
