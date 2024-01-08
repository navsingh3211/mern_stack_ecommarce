import mongoose from "mongoose";
import validator  from "validator";

interface IUser extends Document{
  _id:String;
  name:String;
  email:String;
  photo:String;
  role:"admin" | "user";
  gender:"male"| "female";
  dob:Date;
  createdAt:Date;
  updatedAt:Date;
  age:number;/*virtual attribute */
};

const schema = new mongoose.Schema(
  {
    _id:{
      type:String,
      required:[true,"Please enter the Id"]
    },
    name:{
      type:String,
      required:[true,"Please enter the name"]
    },
    email:{
      type:String,
      unique:[true,"Email already exist"],
      required:[true,"Please enter the email"],
      validate:validator.default.isEmail
    },
    photo:{
      type:String,
      required:[true,"Please add photo"]
    },
    role:{
      type:String,
      enum:["admin","user"],
      default:"user"
    },
    gender:{
      type:String,
      enum:["male","female"],
      required:[true,"Plase enter gender"]
    },
    dob:{
      type:Date,
      required:[true,"Please enter the D.O.B"]
    }
  },
  {
    timestamps:true
  }
);

schema.virtual("age").get(function(){
  if (!this.dob) {
    return null; // or return a default value, or handle the absence of 'dob' field
  }
  const today =  new Date();
  const dob = this.dob;
  if (isNaN(dob.getTime())) {
    return null; // Handle invalid date formats
  }
  let age = today.getFullYear() - dob.getFullYear();
  if(today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()){
    age--;
  }
  return age
});

export const User = mongoose.model<IUser>("User",schema);