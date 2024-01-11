import {Request,Response, NextFunction } from "express";
import { User } from "../models/user.js";
import {NewUserRequest} from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
    async(
      req:Request<{},{},NewUserRequest>,
      res:Response,
      next:NextFunction
    )=>{
        // return next(new ErrorHandler());
        // throw new Error("Some error occured!");
        const { _id,name,email,photo,gender,dob} = req.body;
        let user = await User.findOne({_id:_id,status:true});
        if(user){
            return res.status(200).json({
                success:true,
                message:`Welcome, ${user.name}`
            })
        }
        if(!_id || !name || !email || !photo || !gender || !dob){
            return next(new ErrorHandler("Please add all field!",400));
        }
        
        user = await User.create({
          _id,
          name,
          email,
          photo,
          gender,
          dob: new Date(dob)
        });
        return res.status(200).json({
          success:true,
          message:`Welcome, ${user.name}`
        })
    }
);

export const getAllUsers = TryCatch(
    async(req,res,next)=>{
        let users = await User.find({status:true});
        
        if(users.length === 0){
            return next(new ErrorHandler("No user found!",400));
        }
        return res.status(200).json({
            success:true,
            users
        })
    }
);

export const getUser = TryCatch(
    async (req,res,next)=>{
        const {id} = req.params;
        // console.log(id);
        
        let user = await User.findOne({_id:id,status:true});

        if(!user){
            return next(new ErrorHandler("No user found by given id!",400))
        }

        return res.status(200).json({
            success:true,
            user
        })
    }
);

export const deleteUser = TryCatch(async(req,res,next)=>{
    const {id} = req.params;
    
    let user = await User.findOne({_id:id,status:true});

    if(!user) return next(new ErrorHandler("Invalid Id!",400));

    await User.updateOne(
        {_id:id},
        {$set:{status:false}}
    );

    return res.status(200).json({
        success:true,
        message:`${user.name} account has been deleted successfully.`
    })
});