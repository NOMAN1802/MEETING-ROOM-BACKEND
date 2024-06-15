import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Room } from "../Room/room.model";
import { User } from "../user/user.model";
import Slot from "../Slot/slot.model";


const bookingSchema = new Schema<TBooking>(
    {
      date:
       { 
        type: String,
        required: [true, 'Date is required for booking'] 

       },
      slots: 
      [
        { 
        type: Schema.Types.ObjectId,
        required: [true, 'Slots are required for booking'],
        ref: 'Slot' 

        }
      ],
      room:
       { 
        type: Schema.Types.ObjectId,
         required: [true, 'Room is required for booking'],
         ref: 'Room'
       },
      user: 
      {
         type: Schema.Types.ObjectId,
         required: [true, 'User is required for booking'],
         ref: 'User' },
      totalAmount:
       { 
        type: Number
       },
      isConfirmed: 
      { 
        type: String, 
        enum: ['unconfirmed', 'confirmed', 'cancelled'],
        default: 'unconfirmed'

       },
      isDeleted: {
         type: Boolean,
         default: false }
    },
    {
      timestamps: true
    }
  )

// pre middleware for filter out deleted rooms

bookingSchema.pre('find', function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bookingSchema.pre('findOne', function(next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Booking = model<TBooking>('Booking', bookingSchema)