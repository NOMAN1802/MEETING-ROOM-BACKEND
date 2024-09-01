import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import AppError from "../../errors/AppError";

const createUser = catchAsync(async (req, res) => {
  
    const result = await userServices.createUserIntoDB(req.body)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });
 
  const getUserByEmail = catchAsync(async (req, res) => {
    const users = await userServices.getSingleUserFromDB(req.params.email);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  });

  const getAllUsers = catchAsync(async (req, res) => {
    const users = await userServices.getAllUsersFromDB();
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  });

  const promoteUser = catchAsync(async (req, res) => {
    const { id } = req.params; 
    const { role } = req.body; 
  
    if (!id) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User ID is required');
    }
  
    if (!role || role !== 'admin') {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid role provided');
    }
  
    const result = await userServices.promoteUserToAdmin(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User promoted to admin successfully',
      data: result,
    });
  });
  

export const userControllers ={
  createUser,
  getAllUsers,
  getUserByEmail,
  promoteUser, 
}