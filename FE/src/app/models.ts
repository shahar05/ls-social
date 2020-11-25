interface BaseEntity {
    _id?: string;
}

export interface User extends BaseEntity {
    username: string;
    password: string;
}

export interface Post extends BaseEntity {
    user: User;
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

export interface PostQuery {
    postLength: number;
    posts: Post[];
}
