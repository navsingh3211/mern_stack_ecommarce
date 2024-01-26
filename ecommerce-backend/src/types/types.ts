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
  userId?:string;
  orderId?:string;
  productId?:string | string[];
}

export type OrderItemType = {
  name:string,
  photo:string,
  price:number,
  quantity:number,
  productId:string
}

export type ShippingInfoType = {
  address:string,
  city:string,
  state:string,
  country:string,
  pincode:number
}
export interface NewOrderRequestBody{
  shippingInfo:ShippingInfoType,
  user:string,
  subtotal:number,
  tax:number,
  shippingChanges:number,
  discount:number,
  total:number,
  orderItems:OrderItemType[]
}