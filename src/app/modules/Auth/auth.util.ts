import bcrypt from "bcrypt"


export const isPasswordMatched = async(plainTextPassword:string,hashedPassword:string) : Promise<boolean> =>{
    const matchedPassword = await bcrypt.compare(plainTextPassword,hashedPassword)
    return matchedPassword
}