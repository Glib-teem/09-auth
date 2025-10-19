import axios from 'axios';

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

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

const bffClient = axios.create({
  baseURL: '/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

  const { data } = await bffClient.get<FetchNotesResponse>('/api/notes', {
    params: queryParams,
  });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await bffClient.get<Note>(`/api/notes/${noteId}`);
  return data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const { data } = await bffClient.post<Note>('/api/notes', noteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await bffClient.delete<void>(`/api/notes/${noteId}`);
};

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const { data } = await bffClient.post<User>(
    '/api/auth/register',
    credentials
  );
  return data;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const { data } = await bffClient.post<User>('/api/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await bffClient.post('/api/auth/logout');
};

export const checkSession = async (): Promise<{ success: boolean }> => {
  const { data } = await bffClient.get<{ success: boolean }>(
    '/api/auth/session'
  );
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await bffClient.get<User>('/api/users/me');
  return data;
};

export const updateMe = async (userData: UpdateUserRequest): Promise<User> => {
  const { data } = await bffClient.patch<User>('/api/users/me', userData);
  return data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await bffClient.post<{ url: string }>(
    '/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data.url;
};
