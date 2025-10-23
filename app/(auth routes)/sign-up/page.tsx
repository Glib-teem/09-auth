'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUpPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const userData = await register({ email, password });
      setUser(userData);
      router.push('/profile');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ flex: 1 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
          margin: '40px auto',
          padding: '24px',
          backgroundColor: '#fff',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '8px',
            color: '#212529',
          }}
        >
          Sign up
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '14px',
            fontWeight: 500,
            color: '#212529',
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            style={{
              marginTop: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
            }}
            required
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '14px',
            fontWeight: 500,
            color: '#212529',
          }}
        >
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            style={{
              marginTop: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
            }}
            required
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 16px',
              fontSize: '16px',
              backgroundColor: loading ? '#6c757d' : '#0d6efd',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && (
          <p
            style={{
              color: '#dc3545',
              fontSize: '12px',
              marginTop: '4px',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
