import mongoose from "mongoose";

const baseTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    previewImage: { type: String },
    config: {
      theme: {
        colorPrimary: String,
        colorSecondary: String,
        fontFamily: String,
        darkMode: Boolean,
      },
      brand: {
        name: String,
        logo: String
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
      products: [
        {
          title: String,
          description: String,
          price: String,
          image: String,
        },
      ],
      gallery: [
        {
          image: String
        }
      ],
      video: {
        url: String,
        thumbnail: String
      },
      testimonials: [
        {
          name: String,
          quote: String,
          avatar: String,
        },
      ],
      documentation: [
        {
          title: String,
          url: String
        }
      ],
      faqs: [
        {
          question: String,
          answer: String
        }
      ],
      inspiration: [
        {
          category: String,
          name: String,
          image: String,
          link: String,
          description: String
        }
      ],
      program: {
        title: String,
        image: String,
        reason: String,
        functioning: String,
        methodology: String,
        selection: String,
        cta1: {
          text: String,
          link: String
        },
        cta2: {
          text: String,
          link: String
        }
      },
      contact: {
        email: String,
        phone: String,
        address: String,
        formEnabled: Boolean,
      },
      footer: {
        text: String,
        links: [
          {
            label: String,
            url: String
          }
        ]
      },
    },
  },
  { timestamps: true }
);

export const BaseTemplate = mongoose.model("BaseTemplate", baseTemplateSchema);
