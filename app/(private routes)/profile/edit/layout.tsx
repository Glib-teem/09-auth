import type { Metadata } from 'next';

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

export default function EditProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
