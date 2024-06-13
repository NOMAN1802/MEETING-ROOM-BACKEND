/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ZodError } from "zod";
import zodError from "../errors/zodError";
import { TErrorSources } from "../utils/error";
import mongooseError from "../errors/mongooseError";
import castError from "../errors/castError";
import duplicateError from "../errors/duplicateError";
import config from "../config";
import ApplicationError from "../errors/ApplicationError";
import { ErrorRequestHandler } from "express";



const globalErrorHandler:ErrorRequestHandler =(err,req, res,next) => {

  // setting default values
    let statusCode =  500;
    let message =  'Some thing went wrong';   

    let errorSources : TErrorSources = [{
       path: '',
       message: 'An Error occupied',
    },
  ];

    if(err instanceof ZodError){
      
      const simplifiedError = zodError(err)
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;

    }else if(err?.name === 'ValidationError'){
      
      const simplifiedError = mongooseError(err)
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;

    }else if(err.name === 'CastError'){
      const simplifiedError = castError(err)
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;

    }else if(err.code === 11000){
      const simplifiedError = duplicateError(err)
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    }else if(err instanceof ApplicationError){
      
      statusCode = err?.statusCode;
      message = err?.message;
      errorSources = [{

        path: '',
        message: err?.message
      }];
    }else if(err instanceof Error){
      
      message = err?.message;
      errorSources = [{

        path: '',
        message: err?.message
      }];
    }

    //Final error return

    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      // err,
      stack: config.NODE_ENV === 'development' ? err?.stack : null,
      
    })
  };

  export default globalErrorHandler;
