import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  readTime: string;
  coverImage?: string;
  published: boolean;
  createdAt: Date;
}

const BlogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "Engineering" },
    author: {
      name: { type: String, default: "Azee Team" },
      avatar: { type: String, default: "/logo.png" },
    },
    readTime: { type: String, default: "5 min read" },
    coverImage: { type: String, default: "/assets/branding/NxC b.jpg" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);