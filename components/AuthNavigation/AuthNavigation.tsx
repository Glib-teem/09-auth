'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';

const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link
            href="/profile"
            className={css.navigationLink}
          >
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button
            onClick={handleLogout}
            className={css.logoutButton}
          >
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          className={css.navigationLink}
        >
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          className={css.navigationLink}
        >
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
