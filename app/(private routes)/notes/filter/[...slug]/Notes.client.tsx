'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import type { Note } from '@/types/note';
import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from '@/components/NotesPage/NotesPage.module.css';

const NOTES_PER_PAGE = 12;

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const {
    data: notesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notes', currentPage, debouncedSearchQuery, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: NOTES_PER_PAGE,
        search: debouncedSearchQuery,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  if (isLoading && !notesData) {
    return <Loader message="Loading notes..." />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message={
          error instanceof Error ? error.message : 'Failed to load notes'
        }
        onRetry={refetch}
      />
    );
  }

  const notes: Note[] = notesData?.notes || [];
  const totalPages: number = notesData?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notes"
        />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create note +
        </Link>
      </header>

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <div>
          <h2>No notes found</h2>
          <p>
            {debouncedSearchQuery
              ? `No notes match "${debouncedSearchQuery}". Try a different search term.`
              : 'Create your first note to get started!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesClient;
