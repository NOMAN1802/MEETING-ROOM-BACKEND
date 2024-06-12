import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
    const { password, user: userData } = req.body;
  
    // const result = await UserServices.
  
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'User is created successfully',
    //   data: result,
    // });
  });
  