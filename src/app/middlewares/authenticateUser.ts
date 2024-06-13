import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { User } from "../modules/user/user.model";
import { USER_ROLE} from "../modules/user/user.constant";
import { TUserRoles } from "../modules/Auth/auth.interface";

export const auth = (userRoles: [TUserRoles]) =>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        const token = req.headers?.authorization?.split("Bearer ")[1];

        if(!token){
            throw new Error("You are not authorized!")
        }

        const verifiedToken = jwt.verify(token
             , config.jwt_access_secret as string) as JwtPayload

        console.log(verifiedToken)

        const {role,email} = verifiedToken;

        // check user exist in database or not

         const user = await User.findOne({email});

        if(!user){
            throw new Error("User not found!")
        }

        if(userRoles && !userRoles.includes(role)){
            throw new Error("You are not authorized!")
        }

        req.user = verifiedToken;

        next()
    })
}