import {Request,Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";

export const newProduct = TryCatch(async (req:Request<{},{},{name:string}>,res,next)=>{

});