import Link from 'next/link';
import * as React from 'react';

namespace React {
    interface HTMLAttributes<T> {
        asChild?: boolean;
    }
}

const Breadcrumb = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav aria-label="breadcrumb" className={className} {...props} />
);
const BreadcrumbList = ({ className, ...props }: React.ComponentProps<'ol'>) => (
  <ol
    className={`flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 ${className}`}
    {...props}
  />
);
const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<'li'>) => (
  <li className={`inline-flex items-center gap-1.5 ${className}`} {...props} />
);
const BreadcrumbLink = ({ asChild, className, ...props }: React.ComponentProps<typeof Link> & {asChild?: boolean}) => {
  return <Link className={`transition-colors hover:text-foreground ${className}`} {...props} />
}

const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={`font-normal text-foreground ${className}`}
    {...props}
  />
);
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={`[&>svg]:size-3.5 ${className}`}
    {...props}
  >
    {children ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    )}
  </li>
);

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
}
