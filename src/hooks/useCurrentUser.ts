
import { useAuthStore } from '@/store/useAuthStore';

export const useCurrentUser = () => {
  return useAuthStore((state) => state.user);
};
