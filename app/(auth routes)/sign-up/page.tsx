import type { Metadata } from 'next';
import SignUpPage from '@/components/SignUpPage/SignUpPage';

export const metadata: Metadata = {
  title: 'Sign Up | NoteHub',
  description: 'Create a new NoteHub account and start organizing your notes.',
  openGraph: {
    title: 'Sign Up | NoteHub',
    description:
      'Create a new NoteHub account and start organizing your notes.',
    url: 'https://notehub.app/sign-up',
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

export default function SignUp() {
  return <SignUpPage />;
}
