import type { Metadata } from 'next';
import Link from 'next/link';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description:
    'Sorry, the page you are looking for does not exist. Return to NoteHub home page.',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description:
      'Sorry, the page you are looking for does not exist. Return to NoteHub home page.',
    url: 'https://notehub.app/404',
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

export default function NotFound() {
  return (
    <div className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          style={{
            color: '#0d6efd',
            textDecoration: 'underline',
            fontSize: '16px',
          }}
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
