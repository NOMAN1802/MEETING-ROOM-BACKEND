import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import createToken from "../../utils/tokenGenetrate";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.util";
import jwt, { JwtPayload } from "jsonwebtoken";

const signup = async (payload: TUser) => {
  // checking using email if the user is exists for signup

  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new Error("User Already Exists!");
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser, res: Response) => {
    // checking using email if the user exists for login
    const user = await User.findOne({ email: payload.email }).select("+password");
    if (!user) {
      throw new Error("User Not Found!");
    }
  
    // check if password is matched or not
    const passwordMatch = await isPasswordMatched(payload.password, user.password);
    if (!passwordMatch) {
      throw new Error("Password not matched!");
    }
 
  
    const accessToken = createToken(
      user,
      config.jwt_access_secret as string,
      config.jwt_access_expire_in as string
    )
    
    // const userData = {
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   phone: user.phone,
    //   role: user.role,
    //   address: user.address,
    // };
  
    // Return the user data and token
    return { token: accessToken, user };
    // return user;
  };

  const refreshToken = async(token: string)=>{

    // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // check if the user exist

    const user = await User.findOne({email});

    
  }
 
  

  
export const authServices = {
  signup,
  login,
  refreshToken
};