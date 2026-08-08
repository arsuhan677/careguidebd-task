import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { 
  IPatientQuery, 
  PatientListResponse, 
  IPatient,
  CreatePatientPayload,
  UpdatePatientPayload
} from '@/types/patient';

export const useGetPatients = (query: IPatientQuery) => {
  return useQuery({
    queryKey: ['patients', query],
    queryFn: async (): Promise<PatientListResponse> => {
      // Build query string
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
      
      const res = await api.get(`/patients?${params.toString()}`);
      return res.data;
    },
  });
};

export const useGetPatient = (id: string) => {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: async (): Promise<IPatient> => {
      const res = await api.get(`/patients/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreatePatientPayload) => {
      const res = await api.post('/patients', payload);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdatePatientPayload }) => {
      const res = await api.patch(`/patients/${id}`, payload);
      return res.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patients', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/patients/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
