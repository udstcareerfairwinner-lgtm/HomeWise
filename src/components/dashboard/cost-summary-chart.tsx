'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', expenses: 186, savings: 80 },
  { month: 'February', expenses: 305, savings: 200 },
  { month: 'March', expenses: 237, savings: 120 },
  { month: 'April', expenses: 73, savings: 190 },
  { month: 'May', expenses: 209, savings: 130 },
  { month: 'June', expenses: 214, savings: 140 },
];

const chartConfig = {
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--destructive))',
  },
  savings: {
    label: 'Savings',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function CostSummaryChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
