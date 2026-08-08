'use client';

import { IPatient } from '@/types/patient';
import { IDoctor } from '@/types/doctor';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PatientTableProps {
  data: IPatient[];
  onEdit: (patient: IPatient) => void;
  onDelete: (patient: IPatient) => void;
  onView: (patient: IPatient) => void;
}

export function PatientTable({ data, onEdit, onDelete, onView }: PatientTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSort = params.get('sortBy');
    const currentOrder = params.get('sortOrder');

    if (currentSort === field) {
      params.set('sortOrder', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortBy', field);
      params.set('sortOrder', 'asc');
    }
    
    router.push(`/patients?${params.toString()}`);
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-gray-300">
        <h3 className="mt-4 text-lg font-medium text-gray-900">No patients found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  const getDoctorName = (doctor: string | IDoctor) => {
    if (typeof doctor === 'string') return 'Unknown';
    return doctor.name;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead 
                className="font-semibold cursor-pointer select-none whitespace-nowrap"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center hover:text-gray-900">
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer select-none hidden sm:table-cell"
                onClick={() => handleSort('age')}
              >
                <div className="flex items-center hover:text-gray-900">
                  Age
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="font-semibold cursor-pointer select-none hidden md:table-cell"
                onClick={() => handleSort('gender')}
              >
                <div className="flex items-center hover:text-gray-900">
                  Gender
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-semibold hidden lg:table-cell">Phone</TableHead>
              <TableHead className="font-semibold hidden xl:table-cell">Email</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">Doctor</TableHead>
              <TableHead 
                className="font-semibold cursor-pointer select-none hidden sm:table-cell whitespace-nowrap"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center hover:text-gray-900">
                  Created At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((patient) => (
              <TableRow key={patient._id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium text-gray-900">
                  <div className="flex flex-col">
                    <span>{patient.name}</span>
                    <span className="text-xs text-gray-500 sm:hidden mt-0.5">
                      {patient.age} yrs • {patient.gender}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-500">
                  {patient.age}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    {patient.gender}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-500">
                  {patient.phone}
                </TableCell>
                <TableCell className="hidden xl:table-cell text-gray-500 max-w-[200px] truncate">
                  {patient.email}
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500">
                  {getDoctorName(patient.doctor)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-gray-500 whitespace-nowrap">
                  {format(new Date(patient.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={() => onView(patient)} className="cursor-pointer py-2">
                        <Eye className="mr-2 h-4 w-4 text-gray-500" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(patient)} className="cursor-pointer py-2">
                        <Edit className="mr-2 h-4 w-4 text-blue-500" />
                        Edit Patient
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(patient)} 
                        className="cursor-pointer text-red-600 focus:text-red-600 py-2"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
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
    </div>
  );
}
