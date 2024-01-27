/* eslint-disable no-unused-vars */
import express from 'express';
const router = express.Router();

import userRoute from './user.js';
import productRoute from './products.js';
import orderRoute from './order.js';
import paymentRoute from './payment.js';
import dashboardRoute from './stats.js';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json(
      'Welcome to Ecommarce,Now You can buy or assign some items to other'
    );
  });
  
  router.use('/user', userRoute);
  router.use('/product', productRoute);
  router.use('/order', orderRoute);
  router.use('/payment', paymentRoute);
  router.use('/dashboard', dashboardRoute);

  return router;
};

export default routes;
