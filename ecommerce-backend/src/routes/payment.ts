import express from "express";

import {
  newCoupon,
  applyDiscount,
  allCoupons,
  deleteCoupon
} from '../controllers/payment.js';
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.get('/discount',applyDiscount); //get discount details

router.post('/new',adminOnly,newCoupon); //create a coupon

router.get('/all',adminOnly ,allCoupons); //get all coupon 

router.delete('/:id',adminOnly,deleteCoupon); //get delete coupon


export default router;