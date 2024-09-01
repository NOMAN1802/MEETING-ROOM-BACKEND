import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Room } from "../Room/room.model";
import { TBooking } from "./booking.interface"
import { Booking } from "./booking.model";
import Slot from "../Slot/slot.model";
import { initiatePayment } from "../payment/payment.utils";
import { User } from "../user/user.model";
import { startSession } from "mongoose";


const createBookingIntoDB = async (
  payload: Omit<TBooking, 'totalAmount'>,
): Promise<TBooking> => {
  const { room, slots, user, isConfirmed, date } = payload;

  const session = await startSession();
  session.startTransaction();

  try {
    const roomInfo = await Room.findById(room).session(session);
    if (!roomInfo) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
    }

    if (roomInfo.isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room is deleted!');
    }

    const userInfo = await User.findOne({ _id: user, role: 'user' }).session(session);
    if (!userInfo) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (!(slots?.length ?? false)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Slots cannot be empty');
    }

    const slotDocuments = await Slot.find({
      _id: { $in: slots },
      room,
      isBooked: false,
    }).session(session);
    if (slotDocuments.length !== slots.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'One or more slots are already booked or do not exist',
      );
    }

    const pricePerSlot = roomInfo.pricePerSlot;
    const totalAmount = slots.length * pricePerSlot;

    const transactionId = `TXN-${Date.now()}`;
    const booking = await Booking.create(
      [
        {
          room,
          date,
          slots,
          user,
          transactionId,
          totalAmount,
          isConfirmed,
        },
      ],
      { session },
    );

    if (!booking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
    }

    const slotUpdate = await Slot.updateMany(
      { _id: { $in: slots } },
      { isBooked: true },
      { session },
    );

    if (!slotUpdate) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update slots',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    const slotsDetail = await Promise.all(
      slots.map((slot) => Slot.findById(slot).exec()),
    );

    const populatedBooking = await Booking.findById(booking[0]._id)
      .populate('room')
      .populate({
        path: 'user',
        select: '-password -__v',
      })
      .exec();

    // @ts-ignore
    populatedBooking.slots = slotsDetail;

    // payment
    const paymentData = {
      transactionId,
      totalAmount,
      customerName: userInfo.name,
      customerEmail: userInfo.email,
      customerPhone: userInfo.phone,
      customerAddress: userInfo.address,
    };

    const paymentSession = await initiatePayment(paymentData);

    console.log(paymentSession);

    return paymentSession;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
  }
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