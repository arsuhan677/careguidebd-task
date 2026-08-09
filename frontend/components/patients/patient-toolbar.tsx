'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetDoctors } from '@/hooks/useDoctors';

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

interface PatientToolbarProps {
  onAddPatient: () => void;
}

export function PatientToolbar({ onAddPatient }: PatientToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';
  const currentGender = searchParams.get('gender') || 'all';
  const currentCondition = searchParams.get('condition') || 'all';
  const currentDoctor = searchParams.get('doctor') || 'all';
  const currentCreatedFrom = searchParams.get('createdFrom') || '';
  const currentCreatedTo = searchParams.get('createdTo') || '';

  const [search, setSearch] = useState(currentSearch);
  const debouncedSearch = useDebounce(search, 500);

  // Fetch doctors for filter
  const { data: doctorsRes } = useGetDoctors({ limit: 100 });
  const doctors = doctorsRes?.data || [];

  const commonConditions = ['Fever', 'Diabetes', 'Heart Disease', 'Hypertension', 'Asthma', 'Other'];

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/patients?${params.toString()}`);
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
    router.push('/patients');
  };

  const hasActiveFilters = 
    currentSearch !== '' || 
    currentGender !== 'all' || 
    currentCondition !== 'all' || 
    currentDoctor !== 'all' || 
    currentCreatedFrom !== '' || 
    currentCreatedTo !== '';

  const handleDateChange = (key: 'createdFrom' | 'createdTo', value: string) => {
    updateFilters(key, value);
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search patients..."
            className="pl-9 bg-white h-10 w-full rounded-md border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <Button onClick={onAddPatient} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 h-10 rounded-md shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-center gap-3">
        <Select 
          value={currentGender || "all"} 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onValueChange={(val: any) => updateFilters('gender', val)}
        >
          <SelectTrigger className="w-full sm:w-[150px] bg-white h-10 rounded-md border-gray-200">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={currentCondition || "all"} 
          onValueChange={(val: any) => updateFilters('condition', val)}
        >
          <SelectTrigger className="w-full sm:w-[150px] bg-white h-10 rounded-md border-gray-200">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            {commonConditions.map(cond => (
              <SelectItem key={cond} value={cond}>{cond}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={currentDoctor || "all"} 
          onValueChange={(val: any) => updateFilters('doctor', val)}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-white h-10 rounded-md border-gray-200 col-span-2 sm:col-span-1">
            <SelectValue placeholder="Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            {doctors.map(doc => (
              <SelectItem key={doc._id} value={doc._id}>{doc.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 col-span-2 sm:col-span-1">
          <Input 
            type="date"
            className="w-full sm:w-[140px] bg-white h-10 rounded-md border-gray-200"
            value={currentCreatedFrom}
            onChange={(e) => handleDateChange('createdFrom', e.target.value)}
            max={currentCreatedTo || undefined}
          />
          <span className="hidden sm:inline text-gray-400 font-medium px-1">-</span>
          <Input 
            type="date"
            className="w-full sm:w-[140px] bg-white h-10 rounded-md border-gray-200"
            value={currentCreatedTo}
            onChange={(e) => handleDateChange('createdTo', e.target.value)}
            min={currentCreatedFrom || undefined}
          />
        </div>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="col-span-2 sm:col-span-1 h-10 px-3 text-gray-500 hover:text-gray-900 w-full sm:w-auto mt-1 sm:mt-0"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
