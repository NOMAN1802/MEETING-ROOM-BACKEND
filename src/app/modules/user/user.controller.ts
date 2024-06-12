import httpStatus from "http-status";
import sendResponse from "../utils/sendResponse";
import catchAsync from "../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
  
    const result = await UserServices.createStudentIntoDB(password, studentData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  });
  