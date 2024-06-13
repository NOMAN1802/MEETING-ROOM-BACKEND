import { Model } from "mongoose";
import { userRoles } from "./user.constant";

export interface TUser {
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    role: string,
};

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    comparePassword(
      plainPassword: string,
      hashedPassword: string
    ): Promise<boolean>;
  }
export type TUserRoles = keyof typeof userRoles;

