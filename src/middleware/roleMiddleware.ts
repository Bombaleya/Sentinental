import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../config'
import { Request, Response, NextFunction } from 'express';


export function roleMiddleware(roles: string[]) {
    return function roleMiddleware(req: Request, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const authHeader = req.headers.authorization;

            if(!authHeader) {
                return console.log('User is not authorized')
            }
            const token = authHeader.split(' ')[1]

            if (!token) {
                return res.status(403).json({message: "User is not authorized"})
            }
            const {roles: userRoles} = jwt.verify(token, config.jwtSecret) as JwtPayload

            let hasRole = false
            userRoles.forEach((role: string) => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "You don't have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
};
