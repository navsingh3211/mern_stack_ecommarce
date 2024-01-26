import express from "express";

import {
  newOrder,
  myOrders,
  allOrders,
  getOrderDetails,
  processOrder,
  deleteOrder
} from '../controllers/order.js';
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new',newOrder); //create a order

router.get('/my',myOrders); //get your order

router.get('/all',adminOnly,allOrders); // get all orders for admin

router.route('/:orderId')
  .get(getOrderDetails)
  .put(adminOnly,processOrder)
  .delete(adminOnly,deleteOrder); // get order-details/update/delete by id


export default router;