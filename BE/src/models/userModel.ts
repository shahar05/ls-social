import { Schema } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, unique: true, required: true, immutable: true },
    password: { type: String, required: true, immutable: true }
});