import mongoose, { Schema, Document } from "mongoose";

export interface IPortfolioItem extends Document {
  idString: string;
  category: "logos" | "posts" | "motion-graphics" | "memecoins";
  type: "image" | "video";
  url: string;
  title: string;
  createdAt: Date;
}

const PortfolioItemSchema: Schema = new Schema(
  {
    idString: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PortfolioItem ||
  mongoose.model<IPortfolioItem>("PortfolioItem", PortfolioItemSchema);