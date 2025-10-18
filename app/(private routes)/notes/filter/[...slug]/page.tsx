import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';

const VALID_TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';

  const filterTitle = tag === 'All' ? 'All Notes' : `${tag} Notes`;

  return {
    title: `${filterTitle} | NoteHub`,
    description: `Browse your ${filterTitle.toLowerCase()} in NoteHub. Organize and manage your personal notes efficiently.`,
    openGraph: {
      title: `${filterTitle} | NoteHub`,
      description: `Browse your ${filterTitle.toLowerCase()} in NoteHub. Organize and manage your personal notes efficiently.`,
      url: `https://notehub.app/notes/filter/${tag}`,
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
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';

  if (!VALID_TAGS.includes(tag)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag === 'All' ? undefined : tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        tag: tag === 'All' ? undefined : tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag === 'All' ? undefined : tag} />
    </HydrationBoundary>
  );
}
