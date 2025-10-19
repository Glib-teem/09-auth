export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError, AxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';
import { api } from '@/lib/api/api';
// Тип для ApiError
type ApiError = AxiosError & {
  response: {
    data: {
      error: string;
    };
    status: number;
  };
};

export async function GET() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    const res = await api.get('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      const status = (error as ApiError).response?.status ?? 500;
      return NextResponse.json(
        {
          error: (error as ApiError).message,
          response: (error as ApiError).response?.data,
        },
        { status: status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    const cookieHeader = cookieStore.toString();

    const res = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      const status = (error as ApiError).response?.status ?? 500;
      return NextResponse.json(
        {
          error: (error as ApiError).message,
          response: (error as ApiError).response?.data,
        },
        { status: status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
