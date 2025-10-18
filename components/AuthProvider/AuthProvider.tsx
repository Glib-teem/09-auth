'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe, logout } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';

interface AuthProviderProps {
  children: React.ReactNode;
}

const privateRoutes = ['/profile', '/notes'];

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearUser } = useAuthStore();

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionData = await checkSession();

        if (sessionData.success) {
          const userData = await getMe();
          setUser(userData);
        } else {
          clearUser();
          if (isPrivateRoute) {
            await logout();
            router.push('/sign-in');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        clearUser();
        if (isPrivateRoute) {
          await logout();
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, clearUser, router, isPrivateRoute]);

  if (loading && isPrivateRoute) {
    return <Loader message="Checking authentication..." />;
  }

  return <>{children}</>;
};

export default AuthProvider;
