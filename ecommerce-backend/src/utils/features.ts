import mongoose from "mongoose";
import { OrderItemType, invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";


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




export const invalidateCache = async ({product,order,admin,userId,orderId}:invalidateCacheProps)=>{
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
    const orderKeys:string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`
    ];
  
    myCache.del(orderKeys);
  }

  if(admin){

  }
}

export const reduceStock = async (orderItems:OrderItemType[])=>{
  for(let i=0;i<orderItems.length;i++){
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if(!product) throw new Error("Product Not Found!");
    product.stock -= order.quantity;
    await product.save();
  } 
}


