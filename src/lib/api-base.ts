// Central place to determine which backend API to call.
// - In development: use localhost
// - On Vercel: use the hosted backend URL (unless NEXT_PUBLIC_API_URL overrides it)

const LOCAL_API_ORIGIN = 'http://localhost:5000';
const HOSTED_API_ORIGIN = 'http://bdmsvisfyzyyr2qdfzvdy9om.187.124.169.162.sslip.io';

const normalizeToApiBaseUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  // If it already contains /api, use it (ensure trailing /api)
  if (trimmed.includes('/api')) {
    return trimmed.replace(/\/api\/?$/, '') + '/api';
  }
  // Otherwise treat it like an origin
  return trimmed.replace(/\/$/, '') + '/api';
};

export const API_BASE_URL = (() => {
  // Explicit override (recommended for Vercel env vars)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return normalizeToApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  }

  // Vercel sets NEXT_PUBLIC_VERCEL_URL during build
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `${HOSTED_API_ORIGIN}/api`;
  }

  return `${LOCAL_API_ORIGIN}/api`;
})();

export const API_ORIGIN = (() => {
  // If NEXT_PUBLIC_API_URL is set, derive origin from it
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
      .trim()
      .replace(/\/api\/?$/, '');
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return HOSTED_API_ORIGIN;
  }

  return LOCAL_API_ORIGIN;
})();

