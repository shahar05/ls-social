import { Schema } from "mongoose";

export const PostSchema = new Schema({
    user:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
        immutable: true,
        required: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    creationDate: { type: Date, default: new Date() , immutable: true },
    modifyDate: { type: Date, default: new Date() },
    likes: [{
        type: String
    }],
});