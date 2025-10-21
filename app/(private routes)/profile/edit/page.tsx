import type { Metadata } from 'next';
import { getMe } from '@/lib/api/serverApi';
import EditProfilePageClient from './EditProfile.client';

export const metadata: Metadata = {
  title: 'Edit Profile - NoteHub',
  description: 'Edit your NoteHub profile information',
  openGraph: {
    title: 'Edit Profile - NoteHub',
    description: 'Edit your NoteHub profile information',
    url: 'https://notehub.app/profile/edit',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub',
      },
    ],
  },
};

export default async function EditProfile() {
  const user = await getMe();

  return <EditProfilePageClient initialUser={user} />;
}
