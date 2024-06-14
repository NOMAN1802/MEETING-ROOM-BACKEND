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

  const getAllRooms = catchAsync(async (req, res) => {
    const result = await roomServices.getAllRoomFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rooms retrieved successfully',
      data: result,
    });
  });  

  const updateRoom = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await roomServices.updateRoomIntoDB(
      id,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room updated successfully',
      data: result,
    });
  });

  const deleteRoom = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await roomServices.deleteRoomFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Room deleted successfully',
      data: result,
    });
})

    export const roomControllers = {
        createRoom,
        getSingleRoom,
        getAllRooms,
        updateRoom,
        deleteRoom
    }