import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";

export const getDashboardStats = TryCatch(async(req,res,next)=>{
  let stats = {};
  if(myCache.has("admin-stats")) stats = JSON.parse(myCache.get("admin-stats") as string);
  else{
    const today = new Date(); //end of this month

    let sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth()-6);


    const thisMonth = {
      start:new Date(today.getFullYear(),today.getMonth(),1),
      end:today
    }

    const lastMonth = {
      start:new Date(today.getFullYear(),today.getMonth()-1,1),
      end:new Date(today.getFullYear(),today.getMonth(),0)
    }

    const thisMonthProductsPromise = Product.find({
      status:true,
      createdAt:{
        $gte:thisMonth.start,
        $lte:thisMonth.end
      }
    });

    const lastMonthProductsPromise = Product.find({
      status:true,
      createdAt:{
        $gte:lastMonth.start,
        $lte:lastMonth.end
      }
    });

    const thisMonthUsersPromise = User.find({
      createdAt:{
        $gte:thisMonth.start,
        $lte:thisMonth.end
      }
    });

    const lastMonthUsersPromise = User.find({
      createdAt:{
        $gte:lastMonth.start,
        $lte:lastMonth.end
      }
    });

    const thisMonthOrdersPromise = Order.find({
      createdAt:{
        $gte:thisMonth.start,
        $lte:thisMonth.end
      }
    });

    const lastMonthOrdersPromise = Order.find({
      createdAt:{
        $gte:lastMonth.start,
        $lte:lastMonth.end
      }
    });

    const lastSixMonthOrdersPromise = Order.find({
      createdAt:{
        $gte:sixMonthsAgo,
        $lte:today
      }
    });

    let [
      thisMonthProducts,
      lastMonthProducts,
      thisMonthUsers,
      lastMonthUsers,
      thisMonthOrders,
      lastMonthOrders,
      productsCount,
      usersCount,
      allOrders,
      lastSixMonthOrders
    ] = await Promise.all([
      thisMonthProductsPromise,
      lastMonthProductsPromise,
      thisMonthUsersPromise,
      lastMonthUsersPromise,
      thisMonthOrdersPromise,
      lastMonthOrdersPromise,
      Product.countDocuments({status:true}),
      User.countDocuments(),
      Order.find({}).select("total"),
      lastSixMonthOrdersPromise
    ]);

    const thisMonthRevenue = thisMonthOrders.reduce((total,current)=> total + (current.total || 0),0);
    const lastMonthRevenue = lastMonthOrders.reduce((total,current)=> total + (current.total || 0),0);
    // console.log(thisMonthRevenue,lastMonthRevenue,'thisMonthRevenue')
    const changePercent = {
      revenue:calculatePercentage(thisMonthRevenue,lastMonthRevenue),
      product :calculatePercentage(thisMonthProducts.length,lastMonthProducts.length),
      user: calculatePercentage(thisMonthUsers.length,lastMonthUsers.length),
      order:calculatePercentage(thisMonthOrders.length,lastMonthOrders.length)
    }
   
    const revenue = allOrders.reduce((total,order)=> total + (order.total || 0),0);

    const count = {
      revenue,
      user:usersCount,
      product:productsCount,
      order:allOrders.length
    }

    let orderMonthCounts = new Array(6).fill(0);
    let orderMonthlyRevenue = new Array(6).fill(0);


    lastSixMonthOrders.forEach((order)=>{
      const creationDate = order.createdAt;
      const monthDiff = today.getMonth() - creationDate.getMonth();
      if(monthDiff<6){
        orderMonthCounts[6-monthDiff-1] +=1;
        orderMonthlyRevenue[6-monthDiff-1] += order.total;
      }
    })

    stats = {
      changePercent,
      count,
      chart:{
        order:orderMonthCounts,
        revenue:orderMonthlyRevenue
      }
    }
  }

  return res.status(200).json({
    success:true,
    stats
  });
});

export const getPieChats = TryCatch(async(req,res,next)=>{
  
});

export const getBarChats = TryCatch(async(req,res,next)=>{
  
});

export const getLineChats = TryCatch(async(req,res,next)=>{
  
});