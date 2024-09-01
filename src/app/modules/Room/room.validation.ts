import { z } from 'zod';

const roomCreateValidationSchema = z.object({
    body: z.object({
    name: z.string({required_error: 'Name is required'}),
    photo: z.string({required_error: 'photo is required'}),
    extraPhoto: z.string({required_error: 'Extra photo is required'}),
    category:z.enum(['featured','regular']),
    roomNo: z.number().int({ message: 'Room number must be an integer' }),
    floorNo: z.number().int({ message: 'Floor number must be an integer' }),
    capacity: z.number().int({ message: 'Capacity must be an integer' }),
    pricePerSlot: z.number().int({ message: 'Price per slot must be an integer' }),
    amenities: z.array(z.string()).nonempty({ message: 'Amenities are required' }),
    isDeleted: z.boolean().default(false).optional()
    })
});

const roomUpdateValidationSchema = z.object({
    body: z.object({
    name: z.string().optional(),
    photo:z.string().optional(),
    extraPhoto: z.string().optional(),
    category:z.enum(['featured','regular']).optional(),
    roomNo: z.number().int({ message: 'Room number must be an integer' }).optional(),
    floorNo: z.number().int({ message: 'Floor number must be an integer' }).optional(),
    capacity: z.number().int({ message: 'Capacity must be an integer' }).optional(),
    pricePerSlot: z.number().int({ message: 'Price per slot must be an integer' }).optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false).optional()
    })
});

export const roomValidations ={
    roomCreateValidationSchema,
    roomUpdateValidationSchema
}
