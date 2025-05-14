import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true
    },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    lastAccess: { type: Date, default: null }
  },
  { timestamps: true }
);

export const Stat = mongoose.model("Stat", statsSchema);
