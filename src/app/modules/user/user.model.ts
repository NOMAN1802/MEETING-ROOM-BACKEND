import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";


const userModel = new Schema<TUser>({
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
        // select: 0,
        
    },
    phone:{
        type:String,
        required:[true,'Contact Number is required']
    },
    role:{
        type: String,
        enum:['user','admin']
    },
    address:{
        type: String
    }
})


userModel.pre('save',async function(next){
    const user = this
    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))
    next()
})


// Password hashed to save in DB

userModel.post('save', function(doc,next){
    doc.password = ""

    next()
})

export const User = model<TUser>("User",userModel)