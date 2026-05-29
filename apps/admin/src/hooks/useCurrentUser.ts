import { authService } from '@/Api/service/authService';
import { useAuthStore } from '@/store/useAuthStore';
import type { UserProfileResponse } from '@bac/contracts/schemas/profile/UserProfileResponse';
import { useQuery } from '@tanstack/react-query';

export const CURRENT_USER_QUERY_KEY = ['auth', 'user'] as const;

export function useCurrentUser() {
  const status = useAuthStore((s) => s.status);

  return useQuery<UserProfileResponse>({
    queryKey: CURRENT_USER_QUERY_KEY,
    enabled: status === 'authenticated',
    retry: false,
    queryFn: async () => {
      const response = await authService.me();

      if (!response.success) {
        throw new Error('Failed to fetch user');
      }

      return response.data;
    },
  });
}
