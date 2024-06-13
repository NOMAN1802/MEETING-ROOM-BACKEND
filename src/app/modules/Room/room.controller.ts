import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { roomServices } from "./room.service";


const createRoom = catchAsync(async (req, res) => {
    
    //will call service func to send this data
    const result = await roomServices.createRoomIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room added successfully',
      data: result,
    })
});

const getSingleRoom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await roomServices.getSingleRoomFromDB(id)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room retrieved successfully',
      data: result,
    });
  });

    export const roomControllers = {
        createRoom,
        getSingleRoom,
    }