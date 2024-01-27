import express from "express";

import {
  newCoupon,
  applyDiscount,
  allCoupons,
  deleteCoupon,
  createPaymentIntent
} from '../controllers/payment.js';
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post('/create',createPaymentIntent); //create a coupon

router.get('/discount',applyDiscount); //get discount details

router.post('/new',adminOnly,newCoupon); //create a coupon

router.get('/all',adminOnly ,allCoupons); //get all coupon 

router.delete('/:id',adminOnly,deleteCoupon); //get delete coupon


export default router;