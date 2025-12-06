import type { Machine, MaintenanceTask } from './types';

export const machines: Machine[] = [
  // {
  //   id: 'machineId456',
  //   userId: 'userId123',
  //   name: 'Toyota Corolla',
  //   category: 'Vehicle',
  //   brand: 'Toyota',
  //   model: 'Corolla 2020',
  //   purchaseDate: '2020-06-15',
  //   warrantyExpiry: '2025-06-15',
  //   lastMaintenance: '2024-08-01',
  //   usageFrequency: 'Daily',
  //   serialNumber: 'ABC12345',
  //   maintenanceHistory: [
  //     {
  //       id: 'hist1',
  //       task: 'Oil Change',
  //       date: '2024-08-01',
  //       cost: 60,
  //     },
  //     {
  //       id: 'hist2',
  //       task: 'Tire Rotation',
  //       date: '2024-02-10',
  //       cost: 40,
  //     }
  //   ],
  //   imageUrl: 'https://picsum.photos/seed/car/400/300',
  //   imageHint: 'sedan car'
  // },
  // {
  //   id: 'machineId457',
  //   userId: 'userId123',
  //   name: 'Samsung Fridge',
  //   category: 'Kitchen Appliance',
  //   brand: 'Samsung',
  //   model: 'RF28R7551SR',
  //   purchaseDate: '2021-01-20',
  //   warrantyExpiry: '2026-01-20',
  //   lastMaintenance: '2024-01-15',
  //   usageFrequency: 'Daily',
  //   serialNumber: 'DEF67890',
  //   maintenanceHistory: [
  //      {
  //       id: 'hist3',
  //       task: 'Water Filter Replacement',
  //       date: '2024-01-15',
  //       cost: 50,
  //     }
  //   ],
  //   imageUrl: 'https://picsum.photos/seed/fridge/400/300',
  //   imageHint: 'kitchen appliance'
  // },
  // {
  //   id: 'machineId458',
  //   userId: 'userId123',
  //   name: 'LG Washing Machine',
  //   category: 'Laundry',
  //   brand: 'LG',
  //   model: 'WM3900HWA',
  //   purchaseDate: '2022-09-01',
  //   warrantyExpiry: '2027-09-01',
  //   lastMaintenance: '2024-03-01',
  //   usageFrequency: 'Weekly',
  //   serialNumber: 'GHI11223',
  //   maintenanceHistory: [
  //      {
  //       id: 'hist4',
  //       task: 'Drain and Drum Clean',
  //       date: '2024-03-01',
  //       cost: 25,
  //     }
  //   ],
  //   imageUrl: 'https://picsum.photos/seed/washingmachine/400/300',
  //   imageHint: 'laundry appliance'
  // },
  // {
  //   id: 'machineId459',
  //   userId: 'userId123',
  //   name: 'Carrier AC',
  //   category: 'HVAC',
  //   brand: 'Carrier',
  //   model: 'Infinity 26',
  //   purchaseDate: '2019-05-20',
  //   warrantyExpiry: '2029-05-20',
  //   lastMaintenance: '2024-04-10',
  //   usageFrequency: 'Daily',
  //   serialNumber: 'JKL44556',
  //   maintenanceHistory: [
  //      {
  //       id: 'hist5',
  //       task: 'Filter Cleaning',
  //       date: '2024-04-10',
  //       cost: 75,
  //     }
  //   ],
  //   imageUrl: 'https://picsum.photos/seed/acunit/400/300',
  //   imageHint: 'air conditioner'
  // }
];

export const maintenanceTasks: MaintenanceTask[] = [
  // {
  //   id: 'taskId789',
  //   machineId: 'machineId456',
  //   taskName: 'Oil Change',
  //   dueDate: '2024-12-01',
  //   status: 'Pending',
  //   estimatedCost: 70,
  //   urgencyLevel: 'Medium',
  //   notificationSent: false,
  // },
  // {
  //   id: 'taskId790',
  //   machineId: 'machineId457',
  //   taskName: 'Water Filter Replacement',
  //   dueDate: '2024-07-15',
  //   status: 'Pending',
  //   estimatedCost: 55,
  //   urgencyLevel: 'High',
  //   notificationSent: true,
  // },
  // {
  //   id: 'taskId791',
  //   machineId: 'machineId458',
  //   taskName: 'Drain and Drum Clean',
  //   dueDate: '2024-09-01',
  //   status: 'Pending',
  //   estimatedCost: 30,
  //   urgencyLevel: 'Low',
  //   notificationSent: false,
  // },
  //   {
  //   id: 'taskId792',
  //   machineId: 'machineId456',
  //   taskName: 'Brake Inspection',
  //   dueDate: '2024-10-01',
  //   status: 'Pending',
  //   estimatedCost: 150,
  //   urgencyLevel: 'High',
  //   notificationSent: true,
  // },
  // {
  //   id: 'taskId793',
  //   machineId: 'machineId459',
  //   taskName: 'Refrigerant Check',
  //   dueDate: '2025-04-10',
  //   status: 'Pending',
  //   estimatedCost: 200,
  //   urgencyLevel: 'Medium',
  //   notificationSent: false,
  // },
];
