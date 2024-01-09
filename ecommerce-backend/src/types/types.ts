import { Request,Response,NextFunction } from 'express';

export interface NewUserRequest {
  _id:String;
  name:String;
  email:String;
  photo:String;
  role:String;
  gender:String;
  dob:Date;
};

export type controllerType = (
    req: Request, res: Response, next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;