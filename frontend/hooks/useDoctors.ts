import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { 
  IDoctorQuery, 
  DoctorListResponse, 
  IDoctor,
  CreateDoctorPayload,
  UpdateDoctorPayload
} from '@/types/doctor';

export const useGetDoctors = (query: IDoctorQuery) => {
  return useQuery({
    queryKey: ['doctors', query],
    queryFn: async (): Promise<DoctorListResponse> => {
      // Clean undefined or empty strings from query
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
      const res: any = await api.get(`/doctors?${params.toString()}`);
      return {
        data: res.data,
        pagination: res.pagination,
      };
    },
  });
};

export const useGetDoctor = (id: string | null) => {
  return useQuery({
    queryKey: ['doctors', id],
    queryFn: async (): Promise<IDoctor> => {
      const res: any = await api.get(`/doctors/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreateDoctorPayload): Promise<IDoctor> => {
      const res: any = await api.post('/doctors', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateDoctorPayload }): Promise<IDoctor> => {
      const res: any = await api.patch(`/doctors/${id}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/doctors/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
