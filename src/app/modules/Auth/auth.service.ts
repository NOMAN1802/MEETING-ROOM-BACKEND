import httpStatus from "http-status";
import config from "../../config";
import createToken from "../../utils/tokenGenerate";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isPasswordMatched } from "./auth.util";
import AppError from "../../errors/AppError";


const signup = async (payload: TUser) => {
 
  // checking using email if the user is exists for signup

  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST,"User Already Exists!");
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {

  // checking user existence using email 
  const user = await User.findOne({ email: payload.email }).select("+password");
  // console.log(!user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,"User Not Found!");
  }

  // // check password is matched or not
  // const passwordMatch = await isPasswordMatched(
  //   payload.password,
  //   user.password
  // );

  // if (!passwordMatch) {
  //   throw new AppError(httpStatus.BAD_REQUEST,"Password not matched!");
  // }

  // //  checking if the password is correct
if(!await User.isPasswordMatch(payload?.password, user?.password)){
  throw new AppError(httpStatus.FORBIDDEN,' Password do not match')
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
  
  };

 
  

  
export const authServices = {
  signup,
  login,
 
};