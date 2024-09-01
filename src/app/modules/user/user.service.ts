import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";


const DEFAULT_ROLE = "user";

const createUserIntoDB = async (payload: TUser) => {
  
  const userPayload = {
    ...payload,
    role: payload.role || DEFAULT_ROLE,
  };

  
  const existingUser = await User.findOne({ email: userPayload.email });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');
  } else {
    
    const result = await User.create(userPayload);
    return result;
  }
};

const getAllUsersFromDB = async (): Promise<TUser[]> => {
  const users = await User.find().select('-password'); 
  return users;
};

const promoteUserToAdmin = async (id: string) => {
   
    const user = await User.findById(id); 
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    user.role = 'admin';
    await user.save();
    
    return user;
  };

  const getSingleUserFromDB = async (email: string) => {
    const result = await User.findOne({ email: email });
    return result;
  };
export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  promoteUserToAdmin,
  getSingleUserFromDB,
};
