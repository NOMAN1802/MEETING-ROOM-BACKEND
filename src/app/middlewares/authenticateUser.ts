import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { User } from "../modules/user/user.model";
import { TUserRole } from "../modules/user/user.interface";
import AppError from "../errors/AppError";
import httpStatus from "http-status";


export const authorized = (userRoles: TUserRole[]) =>{

    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        const token = req.headers?.authorization?.split("Bearer ")[1];

        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,"You have no access to this route")
        }

        const verifiedToken = jwt.verify(token
             , config.jwt_access_secret as string) as JwtPayload

        console.log(verifiedToken)

        const {role,email} = verifiedToken;

        // check user exist in database or not

         const user = await User.findOne({email});

        if(!user){
            throw new AppError(httpStatus.NOT_FOUND,"User not found!")
        }

        if(userRoles && !userRoles.includes(role)){
            throw new AppError(
                httpStatus.FORBIDDEN,
                "You are not allowed to access these resource"
              );
        }


        next();
    })
}