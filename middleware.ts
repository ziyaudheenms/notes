import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, api routes, next internals, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/manifest.json') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split('/').filter(Boolean);

  // If root / or already prefixed with 2020 or 2025 or other explicit top-level routes
  if (
    parts.length === 0 ||
    parts[0] === '2020' ||
    parts[0] === '2025' ||
    parts[0] === 'results' ||
    parts[0] === 'contributors'
  ) {
    return NextResponse.next();
  }

  // Handle department prefixes: /cse, /ece, /it, /cse/1, /cse/pyq, etc.
  if (['cse', 'ece', 'it'].includes(parts[0].toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/2020/${parts.join('/')}`;
    return NextResponse.redirect(url);
  }

  // Handle legacy top-level sections
  if (['syllabus', 'notes', 'question-paper'].includes(parts[0].toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/2020/${parts.join('/')}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
