import { Application } from "express";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { UserApi } from "./API/UserApi";
import { PostApi } from "./API/PostApi";
import { authMiddleware } from "./Middleware/authentication";

const port = process.env.PORT || 3000;

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.initSafeRoutes();
        this.initUnSafeRoutes();
    }

    private config() {
        this.app.use(cors({ origin: true }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
    }

    private initSafeRoutes() {
        this.app.use('/api/post',authMiddleware ,new PostApi().getRouter());
    }

    private initUnSafeRoutes() {
        this.app.get('/test' , (req,res)=>res.send('hello world'));
        this.app.use('/api/user', new UserApi().getRouter());
    }

    public start() {
        this.app.listen(port, () => {
            console.log('Server is up and running');
        })
    }
}


const server = new Server();
server.start();

