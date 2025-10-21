import type { Metadata } from 'next';
import SignInPage from '@/components/SignInPage/SignInPage';

export const metadata: Metadata = {
  title: 'Sign In | NoteHub',
  description: 'Sign in to your NoteHub account to access your notes.',
  openGraph: {
    title: 'Sign In | NoteHub',
    description: 'Sign in to your NoteHub account to access your notes.',
    url: 'https://notehub.app/sign-in',
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

export default function SignIn() {
  return <SignInPage />;
}
