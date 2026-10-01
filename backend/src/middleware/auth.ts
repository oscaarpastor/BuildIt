import { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { config } from "../config";
import { HttpError } from "./errors";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export function signToken(userId: string): string {
  return jwt.sign({}, config.jwtSecret, {
    subject: userId,
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"],
    algorithm: "HS256",
  });
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new HttpError(401, "No autenticado"));
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] });
    const sub = typeof payload === "object" ? payload.sub : undefined;
    if (!sub || !isValidObjectId(sub)) throw new Error("sub no válido");
    req.userId = sub;
    next();
  } catch {
    next(new HttpError(401, "Sesión no válida o caducada"));
  }
}

// Para controladores que ya han pasado por requireAuth.
export function currentUserId(req: Request): string {
  if (!req.userId) throw new HttpError(401, "No autenticado");
  return req.userId;
}
