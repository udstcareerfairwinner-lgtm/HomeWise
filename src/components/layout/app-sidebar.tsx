'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  LayoutDashboard,
  Wrench,
  History,
  Settings,
  CircleHelp,
  Bell,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/machines', label: 'Machines', icon: Wrench },
  { href: '/predictions', label: 'Predictions', icon: Lightbulb },
  { href: '/reminders', label: 'Reminders', icon: Bell },
  { href: '/notifications', label: 'Notifications', icon: AlertCircle },
  { href: '/history', label: 'History', icon: History },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Wrench className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">HomeCare AI</span>
        </Link>
        {menuItems.map((item) => (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <CircleHelp className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Help</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              <span className="sr-only">Account</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Account</TooltipContent>
        </Tooltip>
      </nav>
      </TooltipProvider>
    </aside>
  );
}
