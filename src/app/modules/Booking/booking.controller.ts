import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";



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
})

export const bookingControllers = {
    
    createBooking,
    getAllBookings,
   
  }; 