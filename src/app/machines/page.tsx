
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { machines } from '@/lib/data';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Wrench } from 'lucide-react';

export default function MachinesPage() {
  return (
    <>
        <div className="flex justify-end mb-4">
            <Button asChild>
                <Link href="/machines/add">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Machine
                </Link>
            </Button>
        </div>
        <Card>
        <CardHeader>
            <div>
            <CardTitle>My Machines</CardTitle>
            <CardDescription>
                Manage all your household machines and vehicles.
            </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            {/* Desktop View */}
            <div className="hidden md:block">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Machine</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Purchase Date</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {machines.map((machine) => (
                    <TableRow key={machine.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={machine.imageUrl} alt={machine.name} data-ai-hint={machine.imageHint}/>
                            <AvatarFallback>
                            <Wrench />
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                            <Link href={`/machines/${machine.id}`} className="font-medium hover:underline">
                            {machine.name}
                            </Link>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                            {machine.brand} {machine.model}
                            </div>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{machine.category}</Badge>
                    </TableCell>
                    <TableCell>{machine.purchaseDate}</TableCell>
                    <TableCell>{machine.lastMaintenance}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/machines/${machine.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>

            {/* Mobile View */}
            <div className="grid gap-4 md:hidden">
            {machines.map((machine) => (
                <div key={machine.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={machine.imageUrl} alt={machine.name} data-ai-hint={machine.imageHint}/>
                                <AvatarFallback>
                                    <Wrench />
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-0.5">
                                <Link href={`/machines/${machine.id}`} className="font-medium hover:underline">
                                    {machine.name}
                                </Link>
                                <div className="text-sm text-muted-foreground">
                                    {machine.brand} {machine.model}
                                </div>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link href={`/machines/${machine.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                     <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Category:</span>
                             <Badge variant="outline">{machine.category}</Badge>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="font-medium">Purchased:</span>
                            <span>{machine.purchaseDate}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="font-medium">Last Service:</span>
                            <span>{machine.lastMaintenance}</span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </CardContent>
        </Card>
    </>
  );
}
