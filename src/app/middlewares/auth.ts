import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { User } from "../modules/user/user.model";
import { USER_ROLE} from "../modules/user/user.constant";

export const auth = (...requiredRoles :(keyof typeof USER_ROLE)[]) =>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction) =>{
        const token = req.headers.authorization;

        if(!token){
            throw new Error("You are not authorized!")
        }

        const verifiedToken = jwt.verify(token as string , config.jwt_access_secret as string)
        console.log(verifiedToken)

        const {role,email} = verifiedToken as JwtPayload

        // check user exist in database or not

        const user = await User.findOne({email})
        if(!user){
            throw new Error("User not found!")
        }

        if(!requiredRoles.includes(role)){
            throw new Error("You are not authorized!")
        }

        next()
    })
}