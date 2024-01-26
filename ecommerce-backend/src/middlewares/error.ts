import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/utility-class.js';
import { controllerType } from '../types/types.js';


export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if(err.name === 'CastError') err.message = 'Invalid Id';

  return res.status(err.statusCode).json({
    success: false,
    messgae: err.message
  });
}

export const TryCatch = (func: controllerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req,res,next)).catch(next);
  };
}