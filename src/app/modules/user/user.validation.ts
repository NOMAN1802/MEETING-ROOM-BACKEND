import { z } from "zod";

const createUserValidation = z.object({
    body: z.object({
        name:z.string({required_error: 'Name is required'}),
        email:z.string(),
        password: z.
        string({invalid_type_error: 'password must be string'})
        .max(12,{
            message: 'Password can not be more than 12 characters'
        }),
        phone:z.string({required_error: 'Phone number cis required'}),
        role:z.enum(['user','admin']).optional(),
        address:z.string({required_error: 'Address is required'})

    })
})

export const userValidations = {
    createUserValidation

}