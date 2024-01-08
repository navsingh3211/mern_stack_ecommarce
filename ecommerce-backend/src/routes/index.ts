/* eslint-disable no-unused-vars */
import express from 'express';
const router = express.Router();
import user from './user.js';


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
  
  router.use('/user', user);
  return router;
};

export default routes;
