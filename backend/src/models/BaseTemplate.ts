import mongoose from "mongoose";

const baseTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  previewImage: { type: String },
  config: {
    theme: {
      colorPrimary: String,
      colorSecondary: String,
      fontFamily: String,
      darkMode: Boolean
    },
    hero: {
      title: String,
      subtitle: String,
      backgroundImage: String,
      ctaText: String,
      ctaLink: String
    },
    about: {
      heading: String,
      content: String,
      image: String
    },
    features: [
      {
        icon: String,
        title: String,
        description: String
      }
    ],
    testimonials: [
      {
        name: String,
        quote: String,
        avatar: String
      }
    ],
    contact: {
      email: String,
      phone: String,
      address: String,
      formEnabled: Boolean
    },
    footer: {
      text: String,
      links: [String]
    }
  }
}, { timestamps: true });

export const BaseTemplate = mongoose.model("BaseTemplate", baseTemplateSchema);
