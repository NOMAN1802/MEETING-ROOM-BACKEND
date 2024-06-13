import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
import { UserModel } from "../Auth/auth.interface";


const userSchema = new Schema<TUser>({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true
    },
    password:{
        type:String,
        required: [true,"Password is required"],
        select: 0,
        
    },
    phone:{
        type:String,
        required:[true,'Contact Number is required']
    },
    role:{
        type: String,
        enum:['user','admin'],
        required:[true,'Role Number is required']

    },
    address:{
        type: String
    }
},
{
    timestamps: true,
}
)

// password hashing before saving user
userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
  });
  //   empty password value set after saving password
  userSchema.post('save', function(doc, next){
    doc.password =''
    next()
  });

  userSchema.statics.isUserExistsByEmail = async function(email: string) {
    return await User.findOne({email}).select('+password')
  };


  userSchema.statics.isPasswordMatch = async function (plainTextPassword, hashedPassword) {
    return  await bcrypt.compare(plainTextPassword, hashedPassword)
  }

  
  //compare password while user login
  userSchema.statics.comparePassword = async function (
    plainPassword,
    hashedPassword
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };
  userSchema.statics.isUserExists = async function (email) {
    return await User.findOne({ email }).select("+password");
  };
  
  export const User = model<TUser, UserModel>("User", userSchema);