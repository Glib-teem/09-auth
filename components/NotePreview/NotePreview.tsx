'use client';

import { useRouter } from 'next/navigation';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
}

const NotePreview = ({ note }: NotePreviewProps) => {
  const router = useRouter();

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={css.container}>
      <article className={css.item}>
        <button
          onClick={handleBack}
          className={css.backBtn}
          type="button"
        >
          ← Back
        </button>
        <header className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </header>
        <p className={css.content}>{note.content}</p>
        <time
          className={css.date}
          dateTime={note.createdAt}
          aria-label={`Created on ${formattedDate}`}
        >
          Created on: {formattedDate}
        </time>
      </article>
    </div>
  );
};

export default NotePreview;
