import mongoose from "mongoose";

const schema = new mongoose.Schema(
  { 
    name:{
      type:String,
      required:[true,"Please enter the name"]
    },
    photo:{
      type:String,
      required:[true,"Please add photo"]
    },
    price:{
      type:Number,
      required:[true,"Please enter the price  "]
    },
    stock:{
      type:Number,
      required:[true,"Please enter the stock  "]
    },
    category:{
      type:String,
      required:[true,"Plase enter category"],
      trim:true
    },
    status:{
      type:Boolean,
      required:false,
      default:true
    }
  },
  {
    timestamps:true
  }
);



export const Product = mongoose.model("Product",schema);