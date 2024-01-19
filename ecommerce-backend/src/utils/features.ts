import mongoose from "mongoose";
import { invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";


const mongoUrl = 'mongodb://127.0.0.1:27017/inventory';

export const connectDB = async (mongoUrl:string) => {
  try {
    const conn = await mongoose.connect(mongoUrl, {
      dbName:'mern-e-commerce'
    });

    console.log(`🔗🔗🔗🔗 MongoDB Connected: ${conn.connection.host} 🔗🔗🔗🔗`);
    console.log('Connection to the database is successful✅.');
  } catch (error) {
    console.error(
      `🔗‍💥🔗‍💥🔗‍💥🔗‍💥  ${error} 🔗‍💥🔗‍💥🔗‍💥🔗‍💥`
    );
    console.log('Could not connect to the database.', error);
    process.exit(1);
  }
}




export const invalidateCache = async ({product,order,admin}:invalidateCacheProps)=>{
  if(product){
    const productKeys:string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];//`product-${id}`

    const products = await Product.find({}).select("_id");
    products.forEach((ele)=>{
      productKeys.push(`product-${ele}`)
    });
    myCache.del(productKeys);
  }

  if(order){

  }

  if(admin){

  }
}


