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
        const user = await User.create({
          _id,
          name,
          email,
          photo,
          gender,
          dob: new Date(dob)
        });
        return res.status(201).json({
          success:true,
          message:`Welcome, ${user.name}`
        })
    }
);