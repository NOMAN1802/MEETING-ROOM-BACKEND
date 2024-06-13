import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../utils/error";


const zodError = (err : ZodError) :TGenericErrorResponse =>{

    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) =>{
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message
      }
    })
    const statusCode= 400;
    
   return{
    statusCode,
    message: 'Validation Error',
    errorSources,
   }
  }

  export default zodError;