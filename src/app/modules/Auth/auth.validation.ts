import { z } from "zod";

export const userLoginValidation = z.object({

    body: z.object({
        email: z.string({
          required_error: "Email is required",
          invalid_type_error: "Email must be string",
        }),

        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be string",
          }).max(12, {message: "Password can not be more than characters"})

    })
})