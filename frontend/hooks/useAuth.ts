import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: async (): Promise<User | null> => {
      try {
        const res = await api.get('/auth/me');
        return res.data;
      } catch (e: unknown) {
        if (typeof e === 'object' && e !== null && 'status' in e) {
          if ((e as Record<string, unknown>).status === 401) return null;
        }
        throw e;
      }
    },
    retry: false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: Record<string, unknown>) => {
      const res = await api.post('/auth/login', credentials);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data);
      router.push('/dashboard');
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: Record<string, unknown>) => {
      const res = await api.post('/auth/register', userData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data);
      router.push('/dashboard');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.setQueryData(['authUser'], null);
      router.push('/login');
    },
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading: isUserLoading,
    error: userError,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
  };
};
