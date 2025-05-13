import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "BaseTemplate" }, // ✅ origen

    config: {
      theme: {
        colorPrimary: String,
        colorSecondary: String,
        fontFamily: String,
        darkMode: Boolean,
      },
      hero: {
        title: String,
        subtitle: String,
        backgroundImage: String,
        ctaText: String,
        ctaLink: String,
      },
      about: {
        heading: String,
        content: String,
        image: String,
      },
      features: [
        {
          icon: String,
          title: String,
          description: String,
        },
      ],
      testimonials: [
        {
          name: String,
          quote: String,
          avatar: String,
        },
      ],
      contact: {
        email: String,
        phone: String,
        address: String,
        formEnabled: Boolean,
      },
      footer: {
        text: String,
        links: [String],
      }
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
