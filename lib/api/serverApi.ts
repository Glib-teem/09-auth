import { cookies } from 'next/headers';
import { internalBffApi } from './internalApi';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { AxiosResponse } from 'axios';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();

  const { page = 1, perPage = 12, search, tag } = params;

  const queryParams: Record<string, string> = {
    page: String(page),
    perPage: String(perPage),
  };

  if (search?.trim()) {
    queryParams.search = search.trim();
  }

  if (tag) {
    queryParams.tag = tag;
  }

  const { data } = await internalBffApi.get<FetchNotesResponse>('/notes', {
    params: queryParams,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = cookies();

  const { data } = await internalBffApi.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();

  const { data } = await internalBffApi.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkServerSession = async (): Promise<
  AxiosResponse<{ success: boolean }>
> => {
  const cookieStore = cookies();

  const res = await internalBffApi.get<{ success: boolean }>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
