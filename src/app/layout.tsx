import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'HomeCare AI',
  description: 'Smart Maintenance for Every Machine in Your Life',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <SidebarProvider>
          <div className="min-h-screen bg-background">
            <Sidebar variant="sidebar" collapsible="icon">
              <AppSidebar />
            </Sidebar>
            <SidebarInset>
              <AppHeader />
              <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </SidebarInset>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
