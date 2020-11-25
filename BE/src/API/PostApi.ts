import { PostBL } from "../BL/PostBL";
import { grantPostAccess } from "../Middleware/authorization";
import { BaseClassApi } from "./BaseClassApi";


export class PostApi extends BaseClassApi {
    private post: PostBL = new PostBL();

    constructor() {
        super();
    }

    initRoutes(): void {

        this.router.get("/", (req, res) => {
            const offset = Number(req.query.offset);
            this.post.getPosts(offset)
                .then(postQuery => res.json(postQuery))
                .catch(err => res.status(400).send(err));
        });
        this.router.post("/", (req: any, res) => {
            req.body.user = req.user;
            this.post.createPost(req.body)
                .then(post => res.send(post))
                .catch(err => res.status(400).send(err));
        });
        this.router.put("/like", (req: any, res) => {
            this.post.likeToggle(req.body)
                .then(post => res.send(post))
                .catch(err => res.status(400).send(err));
        });

        this.router.put("/:id", grantPostAccess, (req: any, res) => {
            this.post.updatePost(req.params.id, req.body)
                .then(post => res.send(post))
                .catch(err => res.status(400).send(err));
        });

        this.router.delete("/:id", grantPostAccess, (req: any, res) => {
            this.post.deletePost(req.params.id)
                .then(post => res.send(post))
                .catch(err => res.status(400).send(err));
        });
    }
}



