import { JwtPayload } from "jsonwebtoken";
import { userRoles } from "../user/user.constant";

export type TLoginUser = {
    email:string;
    password:string
}

export type TUserRoles = keyof typeof userRoles

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload; 
    }
  }
}