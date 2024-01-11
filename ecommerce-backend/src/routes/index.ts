/* eslint-disable no-unused-vars */
import express from 'express';
const router = express.Router();
import userRoute from './user.js';
import productRoute from './products.js';


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

  return router;
};

export default routes;
