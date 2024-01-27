import {Request,Response, NextFunction } from "express";
import { rm } from "fs";
import {faker} from "@faker-js/faker"
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequest, SearchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

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
  invalidateCache({product:true,admin: true });//removing product from cache

  return res.status(200).json({
    success:true,
    message:"Product has been created successfully."
  })
});

/*Revalidate on New,Update,Delete Product & on New */
export const getLatestProducts = TryCatch(async (req,res,next)=>{
  let products;
  if(myCache.has("latest-products")){
    products = JSON.parse(myCache.get("latest-products") as string);
  }else{
    products = await Product.find({status:true}).sort({createdAt:-1}).limit(5);

    myCache.set("latest-products",JSON.stringify(products));
  }
 
  return res.status(200).json({
    success:true,
    products
  })
});

/*Revalidate on New,Update,Delete Product & on New */
export const getAllCategories = TryCatch(async (req,res,next)=>{
  let categories;
  if(myCache.has("categories")){
    categories = JSON.parse(myCache.get("categories") as string);
  }else{
    categories = await Product.distinct("category",{status:true});
    myCache.set("categories",JSON.stringify(categories));
  }
  
  return res.status(200).json({
    success:true,
    categories
  })
});

/*Revalidate on New,Update,Delete Product & on New */
export const getAdminProducts = TryCatch(async (req,res,next)=>{
  let products;
  if(myCache.has("all-products")){
    products=JSON.parse(myCache.get("all-products") as string);
  }else{
    products = await Product.find({status:true});
    myCache.set("all-products",JSON.stringify(products));
  }
  
  return res.status(200).json({
    success:true,
    products
  })
});

export const getProductsById = TryCatch(async (req,res,next)=>{
  const {id} = req.params;
  let product;
  if(myCache.has(`product-${id}`)){
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  }else{
    product = await Product.findOne({_id:id,status:true});
    if(!product) return next(new ErrorHandler("No product is found with the given Id.",400));
    myCache.set(`product-${id}`,JSON.stringify(product));
  }
  
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

  invalidateCache({product:true,productId:id,admin: true });//removing product from cache

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

  invalidateCache({product:true,productId:id,admin: true });//removing product from cache

  return res.status(200).json({
      success:true,
      message:`product name with ${product.name} has been deleted successfully.`
  })
});

export const searchAllProducts = TryCatch(async (req:Request<{},{},{},SearchRequestQuery>,res,next)=>{
  const {search,sort,category,price} = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page-1)*limit;

  const baseQuery:BaseQuery = {
    status:true
  }

  if(search) baseQuery.name = {
    $regex:search,
    $options:"i"
  }

  if(price) baseQuery.price = {
    $lte:Number(price)
  }

  if(category) baseQuery.category = category;

  // console.log(baseQuery);
  // process.exit(0);
  const productsPromise = Product.find(baseQuery)
    .sort(
      sort && {price:sort === "asc" ? 1 : -1}
    )
    .limit(limit)
    .skip(skip);

  const [products,filteredOnlyProduct] = await Promise.all([
    productsPromise,
    Product.find(baseQuery)
  ]); //to run the both code parallely


  const totalPage = Math.ceil(filteredOnlyProduct.length / limit) ; //floor=100.1--> 100  and ceil = 100.1--> 101

  return res.status(200).json({
    success:true,
    products,
    totalPage
  })
});

const generateRandomProducts = async (count: number = 10) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const product = {
      name: faker.commerce.productName(),
      photo: "uploads\\5ba9bd91-b89c-40c2-bb8a-66703408f986.png",
      price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
      stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
      category: faker.commerce.department(),
      createdAt: new Date(faker.date.past()),
      updatedAt: new Date(faker.date.recent()),
      __v: 0,
    };

    products.push(product);
  }

  await Product.create(products);

  console.log({ succecss: true });
};
// generateRandomProducts(20);

// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };