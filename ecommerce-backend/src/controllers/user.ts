import {Request,Response, NextFunction } from "express";
import { User } from "../models/user.js";
import {NewUserRequest} from "../types/types.js";

export const newUser = async(
    req:Request<{},{},NewUserRequest>,
    res:Response,
    next:NextFunction
  )=>{
  try{
    const { _id,name,email,photo,role,gender,dob} = req.body;
    const user = await User.create({_id,name,email,photo,role,gender,dob});
    return res.status(200).json({
      success:true,
      message:`Welcome, ${user.name}`
    })
  }catch(error){
    console.log(error);
    
  }

}