import crypto from "crypto";
import mongoose from "mongoose";
import { siteConfigDefinition } from "./siteConfig";

// Identificador aleatorio para el enlace público (no adivinable, a diferencia del _id).
export const newPublicId = () => crypto.randomBytes(12).toString("base64url");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    originTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "BaseTemplate" },
    view: { type: String, default: "template" },
    publicId: { type: String, required: true, unique: true, default: newPublicId },
    hiddenSections: { type: [String], default: [] },
    config: siteConfigDefinition,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Project = mongoose.model("Project", projectSchema);
