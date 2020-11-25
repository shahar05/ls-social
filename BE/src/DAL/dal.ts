import mongoose, { Connection, Model, FilterQuery, UpdateQuery, Mongoose } from 'mongoose';
import {  Post, User } from '../models';
import { PostSchema } from '../models/postModel';
import { UserSchema } from '../models/userModel';
import {config} from '../config';

const mongoConnection = config.mongoConnection;

export class DAL {

    private static readonly dal: DAL = new DAL();
    private readonly UserSchema: Model<User> = mongoose.model('User', UserSchema);
    private readonly PostSchema: Model<Post> = mongoose.model('Post', PostSchema);

    private constructor() {
        this.connectDB();
    }
    public static getDAL() {
        return DAL.dal;
    }

    private connectDB() {
        mongoose.connect(mongoConnection, { useUnifiedTopology: true, useNewUrlParser: true })
            .then((mongooseConfig: Mongoose) => {
                mongooseConfig.set('useCreateIndex', true);
                mongooseConfig.set('useFindAndModify', false);
            }).catch((err) => {
                console.log(err);
                console.log("Connection failed");
            });
    }

    createUser(user: User) {
        return DAL.dal.UserSchema.create(user);
    }
    findUser(filterQuery: FilterQuery<User>) {
        return DAL.dal.UserSchema.findOne(filterQuery);
    }

    createPost(post: Post) {
        return DAL.dal.PostSchema.create(post);
    }
    findPost(postId: string) {
        return DAL.dal.PostSchema.findById(postId).populate('user ', '-password');
    }
    getPostsAmount(){
        return DAL.dal.PostSchema.find({}).count();
    }
    findPosts(offset: number) {
        return DAL.dal.PostSchema.find({}).skip(offset).limit(offset + 5).populate('user ', '-password').sort({'creationDate': 'desc'});
    }
    deletePost(postId: string) {
        return DAL.dal.PostSchema.findByIdAndDelete(postId);
    }

    updatePost(postId: string,body: UpdateQuery<Post>) {
        return DAL.dal.PostSchema.findByIdAndUpdate(postId, body, { new: true, runValidators: true }).populate('user');
    }
}