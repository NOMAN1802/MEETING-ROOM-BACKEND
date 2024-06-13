import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const authorized = (...userRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized! Bearer token missing.');
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized! Token missing.');
        }

        try {
            const verifiedToken = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

            const { role, email } = verifiedToken;

            // Check if the user exists in the database
            const user = await User.findOne({ email });
            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
            }

            // Check if the user's role is allowed
            if (userRoles.length && !userRoles.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, 'You are not allowed to access this resource');
            }

            // Attach the user to the request object for further use
            req.user = user;
            
            next();
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Token verification failed! You are not authorized.');
        }
    });
};
