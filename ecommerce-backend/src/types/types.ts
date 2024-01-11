import { Request,Response,NextFunction } from 'express';

export interface NewUserRequest {
  _id:string;
  name:string;
  email:string;
  photo:string;
  role:string;
  gender:string;
  dob:Date;
};

export interface NewProductRequest {
  name:string;
  category:string;
  price:number;
  stock:number;
};

export type controllerType = (
    req: Request, res: Response, next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;