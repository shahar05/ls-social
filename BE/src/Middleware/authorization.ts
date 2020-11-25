import { Response, NextFunction } from "express";
import { DAL } from "../DAL/dal";


export const grantPostAccess = async (req, res: Response, next: NextFunction) => {
    const dal = DAL.getDAL();
    const postId = req.params.id;
    const post = await dal.findPost(req.params.id);
    if (!post) {
        return res.status(400).send('Post Not Found');
    }
    if (post._id.toString() !== postId) {
        return res.sendStatus(401);
    }
    next();
}

