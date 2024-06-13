import { JwtPayload } from "jsonwebtoken";
import bcryptjs from "bcrypt";

export const isPasswordMatched = async(plainPassword:string,hashedPassword:string) : Promise<boolean> =>{
  const matchedPassword = await bcryptjs.compare(plainPassword,hashedPassword)
  return matchedPassword
}
declare global {
    namespace Express {
      interface Request {
        user: JwtPayload; 
      }
    }
  }




