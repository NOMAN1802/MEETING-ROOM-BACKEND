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
    const { date, roomId } = req.query
    const result = await slotServices.getAvailableSlotsFromDB(date as string, roomId as string)
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  })


  const getAllSlots =  catchAsync(async (req, res) => {
    const slots = await slotServices.getAllSlotsFromDB();
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Slots retrieved successfully',
      data: slots,
    });
  });

  const getSingleSlot = catchAsync(async (req, res) => {
    const result = await slotServices.getSingleSlotFromDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slot retrieved successfully',
      data: result,
    });
  });

  const updateSlot = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await slotServices.updateSingleSlotFromDB(id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slot updated successfully',
      data: result,
    });
  });
  
  const deleteSlot = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await slotServices.deleteSingleSlotFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slot deleted successfully',
      data: result,
    });
  });

  

  export const slotControllers = {
    createSlots,
    checkAvailableSlot,
    getAllSlots,
    getSingleSlot,
    updateSlot,
    deleteSlot,
}