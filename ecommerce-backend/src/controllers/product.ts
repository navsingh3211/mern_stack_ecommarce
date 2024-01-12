import {Request,Response, NextFunction } from "express";
import { rm } from "fs";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequest } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { trusted } from "mongoose";

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
  const products = await Product.find({status:true}).sort({createdAt:-1}).limit(5);
  return res.status(200).json({
    success:true,
    products
  })
});

export const getAllCategories = TryCatch(async (req,res,next)=>{
  const categories = await Product.distinct("category",{status:true});
  return res.status(200).json({
    success:true,
    categories
  })
});

export const getAdminProducts = TryCatch(async (req,res,next)=>{
  const products = await Product.find({status:true});
  return res.status(200).json({
    success:true,
    products
  })
});

export const getProductsById = TryCatch(async (req,res,next)=>{
  const {id} = req.params;
  const product = await Product.findOne({_id:id,status:true});
  if(!product) return next(new ErrorHandler("No product is found with the given Id.",400));
  return res.status(200).json({
    success:true,
    product
  })
});

export const updateProduct = TryCatch(async (req,res,next)=>{
  const {id} = req.params;
  const {name,price,stock,category} = req.body;
  const photo = req.file;
  // console.log(photo);
  const product = await Product.findOne({_id:id,status:true});
  if(!product) return next(new ErrorHandler("No product is found with the given Id.",400));

  if(photo){
    rm(product.photo!,()=>{
      console.log("Old photo deleted!");
    });
    product.photo=photo.path;
  }

  if(name) product.name = name;
  if(price) product.price = price;
  if(stock) product.stock = stock;
  if(category) product.category = category;
  await product.save();
 
  return res.status(200).json({
    success:true,
    message:"Product has been updated successfully."
  })
});

export const deleteProduct = TryCatch(async(req,res,next)=>{
  const {id} = req.params;
  
  let product = await Product.findOne({_id:id,status:true});

  if(!product) return next(new ErrorHandler("Invalid Product Id!",400));

  if(product.photo){
    rm(product.photo!,()=>{
      console.log("product photo deleted!");
    });
  }

  await Product.updateOne(
      {_id:id},
      {$set:{status:false}}
  );

  return res.status(200).json({
      success:true,
      message:`product name with ${product.name} has been deleted successfully.`
  })
});