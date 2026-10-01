import { ApiError } from "./api";

/** Clave de traducción para un error de la API. */
export function errorKey(err: unknown, fallback = "errors.generic"): string {
  if (!(err instanceof ApiError)) return fallback;
  if (err.status === 0) return "errors.network";
  if (err.status === 429) return "errors.too_many_attempts";
  if (err.status === 401) return "errors.session_expired";
  return fallback;
}
