'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateMe, uploadImage } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker';
import css from '@/components/EditProfilePage/EditProfilePage.module.css';

interface EditProfilePageClientProps {
  initialUser: User;
}

export default function EditProfilePageClient({
  initialUser,
}: EditProfilePageClientProps) {
  const [username, setUsername] = useState(initialUser.username);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser: setStoreUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      // Якщо є нове фото - завантажуємо його окремо
      if (imageFile) {
        await uploadImage(imageFile);
      }

      // Оновлюю тільки username і email БЕЗ avatar
      const updatedUser = await updateMe({
        username: username,
        email: initialUser.email,
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

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <AvatarPicker
          profilePhotoUrl={initialUser.avatar}
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

          <p>Email: {initialUser.email}</p>

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
