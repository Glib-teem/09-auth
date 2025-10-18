import { nextServer } from './api';
import type { Note, CreateNoteData } from '@/types/note';
import type { User } from '@/types/user';

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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
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

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: queryParams,
  });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', noteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/register', credentials);
  return data;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<{ success: boolean }> => {
  const { data } = await nextServer.get<{ success: boolean }>('/auth/session');
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', userData);
  return data;
};
