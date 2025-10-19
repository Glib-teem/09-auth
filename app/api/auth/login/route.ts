import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

import { api } from '@/lib/api/api';
import { logErrorResponse, setCookiesFromBackend } from '../../_utils/utils';

type BackendHeaders = Readonly<Record<string, string | string[] | undefined>>;

export async function POST(req: NextRequest) {
  const cookieStore = cookies() as unknown as RequestCookies;

  try {
    const body = await req.json();

    const apiRes = await api.post('auth/login', body);

    setCookiesFromBackend(apiRes.headers as BackendHeaders, cookieStore);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.response?.status || 500 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    logErrorResponse({ message: errorMessage });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
