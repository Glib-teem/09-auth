import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError, AxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';
import { api } from '../../../lib/api/externalApi';

type ApiError = AxiosError & {
  response: {
    data: {
      error: string;
    };
    status: number;
  };
};

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const cookieHeader: string = cookieStore.toString();

  try {
    const formData = await request.formData();

    const { data } = await api.post('/upload', formData, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error:
            (error as ApiError).response?.data?.error ??
            (error as ApiError).message,
          response: (error as ApiError).response?.data,
        },
        { status: (error as ApiError).response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
