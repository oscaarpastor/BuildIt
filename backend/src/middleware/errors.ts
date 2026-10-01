import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export const notFound = (message = "Recurso no encontrado") =>
  new HttpError(404, message);

export function apiNotFound(_req: Request, _res: Response, next: NextFunction) {
  next(notFound("Ruta no encontrada"));
}

// Manejador final: nunca devuelve trazas ni mensajes internos al cliente.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Datos no válidos",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message, ...(err.details ? { errors: err.details } : {}) });
    return;
  }

  // JSON mal formado o cuerpo demasiado grande (body-parser)
  const status = (err as { status?: number; type?: string })?.status;
  if (status === 400 || status === 413) {
    res.status(status).json({
      message: status === 413 ? "Petición demasiado grande" : "Petición mal formada",
    });
    return;
  }

  console.error("Error no controlado:", err);
  res.status(500).json({ message: "Error interno del servidor" });
}
