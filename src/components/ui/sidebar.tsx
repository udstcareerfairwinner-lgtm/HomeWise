import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

// Sidebar context

type SidebarContextValue = {
  collapsible: 'icon' | 'button' | 'none';
  variant: 'sidebar' | 'header';
};

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}

// Sidebar provider

function SidebarProvider({children}: {children: React.ReactNode}) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'min-h-screen w-full',
        !isCollapsed && 'lg:grid lg:grid-cols-[280px_1fr]'
      )}
    >
      {children}
    </div>
  );
}

// Sidebar components

const sidebarVariants = cva('h-full border-r bg-muted/40', {
  variants: {
    variant: {
      sidebar: 'hidden lg:block',
      header: 'lg:hidden',
    },
    collapsible: {
      none: '',
      icon: '',
      button: '',
    },
  },
  defaultVariants: {
    variant: 'sidebar',
    collapsible: 'none',
  },
});

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

function Sidebar({className, variant, collapsible, ...props}: SidebarProps) {
  return (
    <SidebarContext.Provider value={{variant: variant || 'sidebar', collapsible: collapsible || 'none'}}>
      <div
        className={cn(sidebarVariants({variant, collapsible, className}))}
        {...props}
      />
    </SidebarContext.Provider>
  );
}

function SidebarHeader({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex h-14 items-center border-b px-6', className)} {...props} />;
}

function SidebarHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

function SidebarHeaderAction({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const {collapsible} = useSidebar();
  if (collapsible !== 'button') {
    return null;
  }
  return (
    <button
      className={cn('ml-auto rounded-md p-1.5 hover:bg-muted-foreground/10', className)}
      {...props}
    />
  );
}

function SidebarContent({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-auto py-2', className)} {...props} />;
}

function SidebarMenu({className, ...props}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('space-y-1 px-4', className)} {...props} />;
}

function SidebarMenuItem({className, ...props}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn(className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      isActive: {
        true: 'bg-primary text-primary-foreground',
        false: 'text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

interface SidebarMenuButtonProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  tooltip?: string;
}

function SidebarMenuButton({
  className,
  isActive,
  tooltip,
  ...props
}: SidebarMenuButtonProps) {
  const {collapsible} = useSidebar();

  if (collapsible === 'icon') {
    return (
      <div className="relative">
        <a className={cn(sidebarMenuButtonVariants({isActive, className}))} {...props} />
        {tooltip && (
          <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-semibold text-background opacity-0 transition-opacity group-hover:opacity-100">
            {tooltip}
          </div>
        )}
      </div>
    );
  }

  return <a className={cn(sidebarMenuButtonVariants({isActive, className}))} {...props} />;
}

function SidebarFooter({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-auto border-t p-4', className)}
      {...props}
    />
  );
}

function SidebarInset({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  const {collapsible} = useSidebar();
  if (collapsible === 'icon') {
    return <div className={cn('p-4', className)} {...props} />;
  }
  return <div className={cn('flex flex-col gap-y-4 p-4 lg:gap-y-6 lg:p-6', className)} {...props} />;
}

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarHeaderAction,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
};
