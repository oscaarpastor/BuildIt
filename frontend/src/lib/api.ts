// Único punto de acceso a la API. En desarrollo VITE_API_URL va vacío y Vite
// reenvía /api al backend; en producción el backend sirve también el frontend.
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

const TOKEN_KEY = "token";
export const AUTH_EXPIRED_EVENT = "auth:expired";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  status: number;
  errors?: { path: string; message: string }[];

  constructor(status: number, message: string, errors?: { path: string; message: string }[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export const apiUrl = (path: string) => `${API_BASE}${path}`;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

async function request(path: string, { method = "GET", body }: RequestOptions = {}) {
  const token = tokenStore.get();
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    // status 0 = sin conexión con el servidor
    throw new ApiError(0, "network");
  }

  if (res.status === 401 && token) {
    tokenStore.clear();
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
  }

  if (!res.ok) {
    let data: { message?: string; errors?: { path: string; message: string }[] } = {};
    try {
      data = await res.json();
    } catch {
      // respuesta sin JSON
    }
    throw new ApiError(res.status, data.message || res.statusText, data.errors);
  }

  return res;
}

export async function api<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
  const res = await request(path, options);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/** Descarga un archivo de un endpoint autenticado. */
export async function downloadFile(path: string, fallbackName: string) {
  const res = await request(path);
  const disposition = res.headers.get("Content-Disposition") || "";
  const match = /filename="([^"]+)"/.exec(disposition);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = match?.[1] || fallbackName;
  link.click();
  URL.revokeObjectURL(url);
}

/** HTML de una web generada (vista pública o miniatura reducida). */
export const siteUrl = (publicId: string, preview = false) =>
  apiUrl(`/api/public/sites/${encodeURIComponent(publicId)}${preview ? "?preview=true" : ""}`);

export const templatePreviewUrl = (templateId: string) =>
  apiUrl(`/api/base-templates/${encodeURIComponent(templateId)}/preview`);

/** Enlace que se comparte con otras personas. */
export const shareUrl = (publicId: string) =>
  `${window.location.origin}/project/${encodeURIComponent(publicId)}/view`;
