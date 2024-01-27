import {Request,Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(
  async (req:Request<{},{},NewOrderRequestBody>,res,next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingChanges,    
      discount,
      total
    } = req.body;

    if(
        !shippingInfo || !orderItems || !user || !subtotal || !subtotal || !tax || !total
      ) return next(new ErrorHandler("Please enter all fields.",400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingChanges,
      discount,
      total
    });

    await reduceStock(orderItems);

    invalidateCache({
      product:true,
      order:true,
      admin:true,
      userId:user,
      productId:order.orderItems.map((item)=>String(item.productId))
    });//removing order from cache
    return res.status(200).json({
      success:true,
      message:"Order Placed Successfully."
    });
  }
);

export const myOrders = TryCatch(
  async (req,res,next) => {
    const {id:user} = req.query;

    let cacheKey = `my-orders-${user}`;

    let orders = [];
    if(myCache.has(cacheKey)) orders = JSON.parse(myCache.get(cacheKey) as string);
    else{
      orders = await Order.find({user});

      myCache.set(cacheKey,JSON.stringify(orders));
    }
    return res.status(200).json({
      success:true,
      orders
    });
  }
);

export const allOrders = TryCatch(
  async (req,res,next) => {

    let cacheKey = `all-orders`;

    let orders = [];
    if(myCache.has(cacheKey)) orders = JSON.parse(myCache.get(cacheKey) as string);
    else{
      orders = await Order.find({}).populate('user','name');

      myCache.set(cacheKey,JSON.stringify(orders));
    }
    return res.status(200).json({
      success:true,
      orders
    });
  }
);

export const getOrderDetails = TryCatch(
  async (req,res,next) => {
    const {orderId} = req.params;

    let cacheKey = `order-${orderId}`;
    // console.log(cacheKey);
    

    let order;
    if(myCache.has(cacheKey)) order = JSON.parse(myCache.get(cacheKey) as string);
    else{
      order = await Order.findOne({_id:orderId}).populate('user','name');

      if(!order) return next(new ErrorHandler("Order not found!",404));

      myCache.set(cacheKey,JSON.stringify(order));
    }
    return res.status(200).json({
      success:true,
      order
    });
  }
);

export const processOrder = TryCatch(
  async (req,res,next) => {
   
    const {orderId} = req.params;
    
    const order = await Order.findById(orderId);
    if(!order) return next(new ErrorHandler("Order not found!",404));

    switch (order.status) {
      case 'Processing':
        order.status = "Shipped"
        break;
      case 'Shipped':
        order.status = "Delivered"
        break;  
      default:
        order.status = "Delivered"
        break;
    }
    await order.save();

    invalidateCache({
      product:false,
      order:true,
      admin:true,
      userId:order.user,
      orderId:String(order._id)
    });//removing order from cache

    return res.status(200).json({
      success:true,
      message:"Order Processed Successfully."
    });
  }
);

export const deleteOrder = TryCatch(
  async (req,res,next) => {
   
    const {orderId} = req.params;
    
    const order = await Order.findById(orderId);
    if(!order) return next(new ErrorHandler("Order not found!",404));

    await order.deleteOne();

    invalidateCache({
      product:false,
      order:true,
      admin:true,
      userId:order.user,
      orderId:String(order._id)
    });//removing order from cache

    return res.status(200).json({
      success:true,
      message:"Order Deleted Successfully."
    });
  }
);