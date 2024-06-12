import config from "../../config";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.util";
import jwt from "jsonwebtoken";

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
  
    // jwt payload creation
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };
  
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: config.jwt_access_expire_in,
    });
  
    const refreshToken = jwt.sign(
      jwtPayload,
      config.jwt_refresh_secret as string,
      {
        expiresIn: config.jwt_refresh_expire_in,
      }
    );
  
    // Reshape the user data to exclude sensitive fields like password
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
    };
  
    // Return the user data and token
    return { token: accessToken, user: userData };
    // return user;
  };
 

  

  
export const authServices = {
  signup,
  login,
};