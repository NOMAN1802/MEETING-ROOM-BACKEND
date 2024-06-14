import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { slotServices } from './slot.service';


const createSlots = catchAsync(async (req: Request, res: Response) => {
    const result = await slotServices.createSlotIntoDB(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Slots created successfully',
        data: result,
      });
  })
  

  const checkAvailableSlot = catchAsync(async (req: Request, res: Response) => {
    // const { date, roomId } = req.query
   
    
    // sendResponse(res, {
    //   success: true,
    //   statusCode: httpStatus.OK,
    //   message: 'Slots created successfully',
    //   data: result,
    // });
  })

  export const slotControllers = {
    createSlots,
    checkAvailableSlot,
}