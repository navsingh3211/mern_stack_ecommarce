import {Request,Response, NextFunction } from "express";
import { rm } from "fs";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequest } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";

export const newProduct = TryCatch(async (req:Request<{},{},NewProductRequest>,res,next)=>{
  const {name,price,stock,category} = req.body;
  const photo = req.file;
  // console.log(photo);
  if(!photo) return next(new ErrorHandler("Please add photo.",400));
  if(!name|| !price || !stock || !category){
    rm(photo.path,()=>{
      console.log("photo deleted!");
    });
    return next(new ErrorHandler("Please enter all fields.",400));
  }
  const product = await Product.create({
    name,
    price,
    stock,
    category:category.toLowerCase(),
    photo:photo.path
  });
  return res.status(200).json({
    success:true,
    message:"Product has been created successfully."
  })
});

export const getLatestProducts = TryCatch(async (req,res,next)=>{
  const products = await Product.find({}).sort({createdAt:-1}).limit(5);
  return res.status(200).json({
    success:true,
    products
  })
});