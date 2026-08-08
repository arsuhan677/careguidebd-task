'use client';

import { IDoctor } from '@/types/doctor';
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
import { MoreHorizontal, Eye, Edit, Trash2, Users } from 'lucide-react';

interface DoctorTableProps {
  data: IDoctor[];
  onView: (doctor: IDoctor) => void;
  onEdit: (doctor: IDoctor) => void;
  onDelete: (doctor: IDoctor) => void;
  onViewPatients?: (doctor: IDoctor) => void;
}

export function DoctorTable({ data, onView, onEdit, onDelete, onViewPatients }: DoctorTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-dashed text-gray-500">
        <p className="text-lg font-medium text-gray-900">No doctors found</p>
        <p className="text-sm mt-1">Adjust your filters or add a new doctor to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-900">Name</TableHead>
              <TableHead className="font-semibold text-gray-900">Specialization</TableHead>
              <TableHead className="font-semibold text-gray-900 hidden md:table-cell">Hospital</TableHead>
              <TableHead className="font-semibold text-gray-900 hidden lg:table-cell">Phone</TableHead>
              <TableHead className="font-semibold text-gray-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((doctor) => (
              <TableRow key={doctor._id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {doctor.name}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {doctor.specialization}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-gray-500">
                  {doctor.hospital}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-gray-500">
                  {doctor.phone}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onViewPatients && (
                        <DropdownMenuItem onClick={() => onViewPatients(doctor)} className="cursor-pointer">
                          <Users className="mr-2 h-4 w-4 text-green-600" />
                          View Patients
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onView(doctor)} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4 text-gray-500" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(doctor)} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4 text-blue-500" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(doctor)} 
                        className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
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
