import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { currentUserId } from "../middleware/auth";
import { HttpError } from "../middleware/errors";
import { updateMeSchema } from "../validation/schemas";

// Solo se puede modificar la propia cuenta, y solo nombre, email y contraseña.
export const updateMe = async (req: Request, res: Response) => {
  const data = updateMeSchema.parse(req.body);
  const user = await User.findById(currentUserId(req)).select("+password");
  if (!user) throw new HttpError(401, "Sesión no válida");

  if (data.email && data.email !== user.email && (await User.exists({ email: data.email }))) {
    throw new HttpError(409, "Ese email ya está registrado");
  }

  if (data.newPassword) {
    const ok = await bcrypt.compare(data.currentPassword ?? "", user.password);
    if (!ok) throw new HttpError(400, "La contraseña actual no es correcta");
    user.password = data.newPassword; // se cifra en pre("save")
  }
  if (data.name !== undefined) user.name = data.name;
  if (data.email !== undefined) user.email = data.email;

  await user.save();
  res.json(user);
};
