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

export type SearchRequestQuery = {
  search?:string;
  price?:string;
  category?:string;
  sort?:string;
  page?:string;
}

export interface BaseQuery{
  status:boolean;
  name?:{
    $regex:string;
    $options:string;
  };
  price?:{ //optional  ? means
    $lte:number;
  };
  category?:string;
}

export type invalidateCacheProps = {
  product?:boolean;
  order?:boolean;
  admin?:boolean;
}