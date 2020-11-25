import mongoose from 'mongoose';
export interface User extends mongoose.Document {
    username: string;
    password: string;
}

export interface Post extends mongoose.Document {
    user:User;
    name: string;
    description: string;
    image: string;
    creationDate: Date;
    modifyDate: Date;
    likes: string[];
}
export interface Like {
    postId: string;
    userId: string;
}

