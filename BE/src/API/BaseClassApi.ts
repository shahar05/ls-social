import { Router, Response } from "express";

export abstract class BaseClassApi {

    protected router: Router;

    constructor() {
        this.router = Router({ mergeParams: true })
        this.initRoutes();
    }
    abstract initRoutes(): void;
    getRouter(): Router {
        return this.router;
    }
}