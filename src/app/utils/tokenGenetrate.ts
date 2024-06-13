import jwt from 'jsonwebtoken';
import { TUser } from '../modules/user/user.interface';


const createToken  =(payload:Partial<TUser> , secretKey: string, expiresIn: string)=> {
  
    const tokenObject  ={
        // userId: payload._id, 
        email: payload.email, 
        role: payload.role
    }    
    return  jwt.sign(tokenObject, secretKey, {expiresIn});
}

export default createToken;