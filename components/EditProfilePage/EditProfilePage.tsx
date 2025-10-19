'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, updateMe, uploadImage } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import Loader from '@/components/Loader/Loader';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser: setStoreUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
        setUsername(userData.username);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let newAvatar = user?.avatar;

      // Якщо користувач обрав нове фото - завантажуємо його
      if (imageFile) {
        newAvatar = await uploadImage(imageFile);
      }

      const updatedUser = await updateMe({
        username,
        avatar: newAvatar,
      });

      setStoreUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to update profile'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) {
    return <Loader message="Loading profile..." />;
  }

  if (!user) {
    return (
      <main className={css.mainContent}>
        <p className={css.errorText}>Failed to load profile</p>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <AvatarPicker
          profilePhotoUrl={user.avatar}
          onChangePhoto={setImageFile}
        />

        <form
          className={css.profileInfo}
          onSubmit={handleSubmit}
        >
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
