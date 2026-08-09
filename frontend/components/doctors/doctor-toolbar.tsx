'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

interface DoctorToolbarProps {
  onAddDoctor: () => void;
}

export function DoctorToolbar({ onAddDoctor }: DoctorToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentSpecialization = searchParams.get('specialization') || 'all';
  const currentHospital = searchParams.get('hospital') || 'all';
  const currentCreatedFrom = searchParams.get('createdFrom') || '';
  const currentCreatedTo = searchParams.get('createdTo') || '';

  const [search, setSearch] = useState(currentSearch);
  const debouncedSearch = useDebounce(search, 500);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/doctors?${params.toString()}`);
  };

  // Sync debounced search to URL
  useEffect(() => {
    if (debouncedSearch !== currentSearch) {
      updateFilters('search', debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentSearch]);

  const clearFilters = () => {
    setSearch('');
    router.push('/doctors');
  };

  const hasActiveFilters = 
    currentSearch !== '' || 
    currentSpecialization !== 'all' || 
    currentHospital !== 'all' ||
    currentCreatedFrom !== '' ||
    currentCreatedTo !== '';

  const handleDateChange = (key: 'createdFrom' | 'createdTo', value: string) => {
    updateFilters(key, value);
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-6">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center flex-wrap">
        <div className="relative w-full sm:max-w-[250px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search doctors..."
            className="pl-9 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
          <Select 
            value={currentSpecialization || "all"} 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onValueChange={(val: any) => updateFilters('specialization', val)}
          >
          <SelectTrigger className="w-full sm:w-[180px] bg-white">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="Cardiology">Cardiology</SelectItem>
            <SelectItem value="Neurology">Neurology</SelectItem>
            <SelectItem value="Orthopedics">Orthopedics</SelectItem>
            <SelectItem value="Pediatrics">Pediatrics</SelectItem>
            <SelectItem value="Dermatology">Dermatology</SelectItem>
          </SelectContent>
        </Select>

          <Select 
            value={currentHospital || "all"} 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onValueChange={(val: any) => updateFilters('hospital', val)}
          >
          <SelectTrigger className="w-full sm:w-[180px] bg-white">
            <SelectValue placeholder="Hospital" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Hospitals</SelectItem>
            <SelectItem value="Dhaka Medical College">Dhaka Medical College</SelectItem>
            <SelectItem value="Square Hospital">Square Hospital</SelectItem>
            <SelectItem value="Apollo Hospital">Apollo Hospital</SelectItem>
            <SelectItem value="United Hospital">United Hospital</SelectItem>
            <SelectItem value="Evercare Hospital">Evercare Hospital</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Input 
            type="date"
            className="w-full sm:w-[135px] bg-white"
            value={currentCreatedFrom}
            onChange={(e) => handleDateChange('createdFrom', e.target.value)}
            max={currentCreatedTo || undefined}
          />
          <span className="text-gray-500">-</span>
          <Input 
            type="date"
            className="w-full sm:w-[135px] bg-white"
            value={currentCreatedTo}
            onChange={(e) => handleDateChange('createdTo', e.target.value)}
            min={currentCreatedFrom || undefined}
          />
        </div>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-900"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <Button onClick={onAddDoctor} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
        <Plus className="mr-2 h-4 w-4" />
        Add Doctor
      </Button>
    </div>
  );
}
