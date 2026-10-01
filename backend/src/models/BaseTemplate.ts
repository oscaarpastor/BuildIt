import mongoose from "mongoose";
import { siteConfigDefinition } from "./siteConfig";

const baseTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    view: { type: String, required: true, unique: true },
    icon: { type: String, default: "" },
    gradient: { type: String, default: "" },
    config: siteConfigDefinition,
  },
  { timestamps: true }
);

export const BaseTemplate = mongoose.model("BaseTemplate", baseTemplateSchema);
