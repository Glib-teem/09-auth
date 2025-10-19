import { parse } from 'cookie';
import type { IncomingHttpHeaders } from 'http';

// ----------------------------------------------------------------
// ЛОКАЛЬНІ ТИПИ ДЛЯ УНИКНЕННЯ ПОМИЛОК
// ----------------------------------------------------------------

type LocalRequestCookie = {
  name: string;
  value: string;
};

interface WritableRequestCookies {
  get(name: string): LocalRequestCookie | undefined;
  has(name: string): boolean;
  getAll(): LocalRequestCookie[];
  set(cookie: LocalRequestCookie): void;
  set(name: string, value: string): void;
}

// ----------------------------------------------------------------

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';
  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export const setCookiesFromBackend = (
  apiResHeaders: Readonly<
    IncomingHttpHeaders | Record<string, string | string[] | undefined>
  >,
  cookieStore: WritableRequestCookies
): void => {
  const setCookie = apiResHeaders['set-cookie'];

  if (setCookie) {
    const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

    for (const cookieStr of cookieArray) {
      const parsed = parse(cookieStr);

      const createCookieObject = (
        name: string,
        value: string
      ): LocalRequestCookie => ({
        name,
        value,
      });

      if (parsed.accessToken) {
        const cookieObj = createCookieObject('accessToken', parsed.accessToken);
        cookieStore.set(cookieObj);
      }
      if (parsed.refreshToken) {
        const cookieObj = createCookieObject(
          'refreshToken',
          parsed.refreshToken
        );
        cookieStore.set(cookieObj);
      }
    }
  }
};
