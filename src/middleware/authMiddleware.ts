import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../config'
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: any, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        if(!req.headers.authorization) {
            return res.status(403).json({message: "User is not authorized"})
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401)
            }

        const decodedData = jwt.verify(token, config.jwtSecret) as JwtPayload | string;
        req.user = decodedData
        next()
    } catch (e) {
    console.log(e)
    return res.status(403).json({message: "User is not authorized"})
    }
};