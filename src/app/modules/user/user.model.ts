import { Schema, model } from "mongoose";
import { TUser,  } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";



const userSchema = new Schema<TUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
        select: 0,
        
    },
    phone:{
        type:String,
        required: true,
    },
    role:{
        type: String,
        enum:['user','admin'],
        // required:true,

    },
    address:{
        type: String,
        required: true,
    }
},
{
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      }
    }
  });
// hashed password
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    }
    next();
  });
// hide password 

userSchema.post('save', function(doc,next){
    doc.password = ""

    next()
})
  
export const User = model<TUser>('User', userSchema)