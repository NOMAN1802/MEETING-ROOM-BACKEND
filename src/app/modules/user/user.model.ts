import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";



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
        select: 0
        
    },
    phone:{
        type:String,
        required:[true,'Contact Number is required']
    },
    role:{
        type: String,
        enum:['user','admin'],
        required:[true,'User must have a role']

    },
    address:{
        type: String,
        required: [true,'Address is required']
    }
},
{
    timestamps: true,
}
);

userSchema.pre('save',async function(next){
    const user = this;

    user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds))

    next()
});
// hide password
userSchema.post('save', function(doc,next){
    doc.password = ""

    next()
})
  
  export const User = model<TUser>("User", userSchema);