import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../utils/error";



const castError = (err: mongoose.Error.CastError) : TGenericErrorResponse =>{

    const errorSources : TErrorSources = [
        {
   path: err.path,
   message: err.message,

    }
];
    
    const statusCode= 400;
    return{
     statusCode,
     message: 'Invalid Id',
     errorSources,
    }
};


export default castError;