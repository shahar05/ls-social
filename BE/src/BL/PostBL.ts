
import { DAL } from "../DAL/dal";
import { AwsHelper } from "../Helpers/awsHelper";
import { Like, Post, User } from "../models";


export class PostBL {


    private dal = DAL.getDAL();

    async createPost(post: Post) {
        const path = `images/${Date.now()}`
        const pathWithExtension = await this.uploadImage(post.image, path);
        post.image = AwsHelper.awsBasePath + pathWithExtension;
        post = await this.dal.createPost(post);
        return this.dal.findPost(post._id);
    }
    async likeToggle(like: Like) {
        const post = await this.dal.findPost(like.postId);
        const index = post.likes.findIndex((userId: string) => userId === like.userId.toString());
        if (index === -1) {
            post.likes.push(like.userId);
        } else {
            post.likes.splice(index, 1);
        }
        return post.save();
    }
    async getPosts(offset: number) {
        const postLength = await this.dal.getPostsAmount();
        const posts = await this.dal.findPosts(offset);
        return { postLength, posts };
    }

    async updatePost(postId: string, fields: Partial<Post>) {
        if (fields.likes) {
            throw new Error(" cant update likes ");
        }
        const newPost = await this.dal.updatePost(postId, fields);
        return newPost

    }
    deletePost(postId: string) {
        return this.dal.deletePost(postId);
    }
    private async uploadImage(image: string, path: string) {
        if (!image.includes(";") || !image.includes("base64"))
            throw new Error("Failed while achivieng base64");
        const type = image.split(";")[0];
        const imageSplit = image.split(",");
        const content = Buffer.from(imageSplit[1], 'base64');
        path += "." + type.split("/")[1];
        await AwsHelper.saveFileToAws(content, path);
        return path;
    }


}

