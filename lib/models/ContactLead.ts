import mongoose, { Schema, Document } from "mongoose";

export interface IContactLead extends Document {
  name: string;
  email: string;
  service: string;
  message: string;
  createdAt: Date;
}

const ContactLeadSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactLead ||
  mongoose.model<IContactLead>("ContactLead", ContactLeadSchema);