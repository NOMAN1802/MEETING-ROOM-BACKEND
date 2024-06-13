import httpStatus from "http-status";
import config from "../../config";
import ApplicationError from "../../errors/ApplicationError";
import createToken from "../../utils/tokenGenerate";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";


const signup = async (payload: TUser) => {
 
  // checking using email if the user is exists for signup

  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new ApplicationError(httpStatus.BAD_REQUEST,"User Already Exists!");
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  
    // checking using email if the user exists for login
    const user = await User.isUserExistsByEmail(payload?.email).select("+password");
    if (!user) {
      throw new ApplicationError(httpStatus.NOT_FOUND,"User Not Found!");
    }
  
    // check if password is matched or not
    const passwordMatch = await User.comparePassword(payload?.password, user.password);
    if (!passwordMatch) {
      throw new ApplicationError(httpStatus.BAD_REQUEST,"Password not matched!");
    }
 
  
    const accessToken = createToken(
      user,
      config.jwt_access_secret as string,
      config.jwt_access_expire_in as string
    )
    
    const refreshToken = createToken(
      user,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expire_in as string
    )
  
    // Return the user data and token
    return {
      accessToken,
      refreshToken,
      user
    };
    // return user;
  };

 
  

  
export const authServices = {
  signup,
  login,
 
};