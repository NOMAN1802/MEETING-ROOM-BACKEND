import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../Room/room.model";
import { IBookingResponse, TBooking } from "./booking.interface"
import { Booking } from "./booking.model";
import Slot from "../Slot/slot.model";


const createBookingIntoDB = async (payload: TBooking) => {
    
    const { date, slots, room, user } = payload;
  
    const roomData = await Room.findById(room).select('pricePerSlot')
  
    if (!roomData) {
      throw new AppError(httpStatus.NOT_FOUND,'Room not found')
    }
  const totalAmount = roomData.pricePerSlot * slots.length
  const newBooking = new Booking({ date, slots, room, user, totalAmount })
  await newBooking.save()

  await Slot.updateMany({ _id: { $in: payload.slots } }, { isBooked: true })
  const result = await newBooking.populate('room user slots')

  return result;

};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('room user slots')
  if (!result) {
   throw new AppError(httpStatus.NOT_FOUND,'Booking not found !')
  }
  return result;
};



const getSpecificUserBookingsFromDB = async(id:string) =>{
  const result = await Booking.find({user: id}).populate('room slots').select('-user')
  return result

}


const updateBookingIntoDB = async (bookingId: string, bookingData: TBooking) => {
  const result = await Booking.findByIdAndUpdate(bookingId, bookingData, { new: true })
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND,'Booking Not found')
  }
  return result;
}

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(id, {isDeleted: true}, {new :true, runValidators: true});
  return result;
};

export const bookingServices = {
createBookingIntoDB,
getAllBookingsFromDB,
getSpecificUserBookingsFromDB,
updateBookingIntoDB,
deleteBookingFromDB

}