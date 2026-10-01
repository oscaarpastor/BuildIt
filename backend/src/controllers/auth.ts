import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { signToken, currentUserId } from "../middleware/auth";
import { HttpError } from "../middleware/errors";
import { loginSchema, registerSchema } from "../validation/schemas";

// Hash de relleno: si el email no existe se compara igualmente, para que el
// tiempo de respuesta no revele qué emails están registrados.
const DUMMY_HASH = bcrypt.hashSync("buildit-dummy-password", 10);
const INVALID_CREDENTIALS = "Email o contraseña incorrectos";

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  if (await User.exists({ email: data.email })) {
    throw new HttpError(409, "Ese email ya está registrado");
  }

  const user = await User.create(data);
  res.status(201).json({ token: signToken(user.id), user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await User.findOne({ email }).select("+password");

  const ok = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
  if (!user || !ok) throw new HttpError(401, INVALID_CREDENTIALS);

  res.json({ token: signToken(user.id), user });
};

export const me = async (req: Request, res: Response) => {
  const user = await User.findById(currentUserId(req));
  if (!user) throw new HttpError(401, "Sesión no válida");
  res.json(user);
};
