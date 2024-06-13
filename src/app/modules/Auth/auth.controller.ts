import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";


const userSignup = catchAsync(
    async( req, res)=>{
        const result = await authServices.signup(req.body);
  
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User registered successfully',
          data: result,
        });
    });

const userLogin = catchAsync(
    async( req, res)=>{
           const result = await authServices.login(req.body);
    console.log("result",result)

    const {accessToken,refreshToken,user} = result
    

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure: config.node_env === 'production'
    })
  
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'User logged in successfully',
          token: result.token,
          data: result.user,
        });
    });

    export const authControllers = {
        userSignup,
        userLogin
    }