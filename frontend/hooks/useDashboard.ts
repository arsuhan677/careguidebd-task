import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { IDashboardData } from '@/types/dashboard';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async (): Promise<IDashboardData> => {
      const res = await api.get('/dashboard');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
