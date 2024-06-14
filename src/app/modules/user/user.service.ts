import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface"
import { User } from "./user.model"


const createUserIntoDB = async (payload: TUser) => {
  
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email: payload.email });
      
      if (existingUser) {
         throw new AppError(httpStatus.BAD_REQUEST,'User already exist')
      } else {
          // If the user doesn't exist, create a new user
          const result = await User.create(payload);
          return result;
      }
  
};

export const userServices = {
    createUserIntoDB,
}