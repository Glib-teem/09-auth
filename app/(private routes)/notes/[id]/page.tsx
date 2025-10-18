import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const noteDescription = note.content
      ? note.content.slice(0, 150) + (note.content.length > 150 ? '...' : '')
      : 'View note details in NoteHub';

    return {
      title: `${note.title} | NoteHub`,
      description: noteDescription,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: noteDescription,
        url: `https://notehub.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note Not Found | NoteHub',
      description: 'The requested note could not be found.',
    };
  }
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient noteId={id} />
      </HydrationBoundary>
    );
  } catch {
    notFound();
  }
}
