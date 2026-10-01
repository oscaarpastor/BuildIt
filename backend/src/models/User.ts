import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select: false -> nunca se lee salvo que se pida explícitamente (+password)
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Cifrar la contraseña cada vez que se crea o se cambia con save()
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Defensa en profundidad: no permitir cambiar la contraseña con updates directos,
// que se saltarían el cifrado de pre("save").
userSchema.pre(["findOneAndUpdate", "updateOne", "updateMany"], function () {
  const update = this.getUpdate() as Record<string, unknown> | null;
  const set = (update?.$set as Record<string, unknown> | undefined) ?? {};
  if (update && ("password" in update || "password" in set)) {
    throw new Error("La contraseña solo puede cambiarse con save()");
  }
});

export const User = mongoose.model("User", userSchema);
