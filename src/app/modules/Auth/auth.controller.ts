import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const userLogin = catchAsync(
    async( req, res)=>{
           const result = await authServices.login(req.body);
           const {accessToken,refreshToken,user} = result;
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure: config.NODE_ENV === 'production'
    })
  
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User logged in successfully',
          token:accessToken,
          data:user,
        });
    });

    export const authControllers = {
       
        userLogin
    }