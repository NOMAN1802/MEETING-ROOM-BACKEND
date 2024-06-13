import jwt from 'jsonwebtoken';
import { TUser } from '../user/user.interface';
const createToken  =(payload:Partial<TUser> , secretKey: string, expiresIn: string)=> {
  
    const tokenObject  ={
     
        email: payload.email, 
        role: payload.role
    }    
    return  jwt.sign(tokenObject, secretKey, {expiresIn});
}

export default createToken;