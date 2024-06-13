import httpStatus from "http-status";
import config from "../../config";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import AppError from "../../errors/AppError";
import { isPasswordMatched } from "../../utils/matchPassword";
import createToken from "./auth.util";


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
  const user = await User.findOne({email: payload.email}).select("+password");
     

  if(!user){
      throw new AppError(httpStatus.NOT_FOUND,' This User not found')
  };
 //  checking if the password is correct

   const passwordMatch = await isPasswordMatched(
    payload?.password,
    user?.password
  );

  if (!passwordMatch){
    throw new AppError(httpStatus.NOT_FOUND,"Password not matched!");
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
    );

    // Convert user document to JSON
  const userWithoutPassword = user.toJSON();
  
    // Return the user data and token
    return {
      accessToken,
      refreshToken,
      user :userWithoutPassword
    };
  
  };

 
  

  
export const authServices = {
  signup,
  login,
 
};