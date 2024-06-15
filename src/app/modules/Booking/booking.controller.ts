import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";



const createBooking = catchAsync(async (req, res) => {
  
    const result = await bookingServices.createBookingIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking created successfully',
      data: result,
    })
});


const getAllBookings = catchAsync( async(req,res) =>{
  const result = await bookingServices.getAllBookingsFromDB();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  })
});


const getSpecificUserBookings = catchAsync(async (req, res) => {
 
    const tokenWithBearer = req.headers.authorization;

    if (!tokenWithBearer) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized users!");
    }
    if (tokenWithBearer) {
      const token = tokenWithBearer.split(" ")[1]; 

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized users!");
      }

      const verifiedToken = jwt.verify(
        token as string,
        config.jwt_access_secret as string
      );

      const { email } = verifiedToken as JwtPayload;
      console.log("email ", email);

      const user = await User.findOne({ email: email });
      const userId = user?._id.toString();

      if (userId) {
       
        const result = await bookingServices.getSpecificUserBookingsFromDB(userId);

        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User bookings retrieved successfully',
          data: result,
        })
        
      }
    }
  
});

const updateBooking = catchAsync(async (req, res) => {

  const { id } = req.params;

  const result = await bookingServices.updateBookingIntoDB(
    id,
    req.body,)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  })
})

const deleteBooking = catchAsync(async(req, res) => {
  const {id} = req.params;
  const result = await bookingServices.deleteBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
})

export const bookingControllers = {
    
    createBooking,
    getAllBookings,
    getSpecificUserBookings,
    updateBooking,
    deleteBooking
   
  }; 