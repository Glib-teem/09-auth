'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
    >
      {isLoading && <Loader message="Loading note..." />}
      {isError && (
        <ErrorMessage
          message={
            error instanceof Error ? error.message : 'Failed to load note'
          }
          onRetry={refetch}
        />
      )}
      {note && (
        <div>
          <NotePreview note={note} />
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <button
              onClick={handleClose}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#0d6efd',
                backgroundColor: 'transparent',
                border: '1px solid #0d6efd',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0d6efd';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0d6efd';
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
