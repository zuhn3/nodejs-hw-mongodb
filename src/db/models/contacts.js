// src/db/models/contacts.js
import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  isFavourite: { type: Boolean, default: false },
  contactType: { type: String, required: true, enum: ['work','home','personal','other'] },
}, { versionKey: false, timestamps: true });

export const Contact = model('Contact', contactSchema);
