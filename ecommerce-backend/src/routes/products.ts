import express from "express";//3:32 hour

import {
    newProduct,
    getLatestProducts,
    getAllCategories,
    getAdminProducts,
    getProductsById,
    updateProduct,
    deleteProduct,
    searchAllProducts
} from '../controllers/product.js'
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post('/new',adminOnly,singleUpload,newProduct);

router.get('/all',searchAllProducts);//get all product with filter and search

router.get('/latest',getLatestProducts);
router.get('/categories',getAllCategories);

router.get('/admin-products',adminOnly,getAdminProducts);

router.route("/:id")
  .get(getProductsById)
  .put(adminOnly,singleUpload,updateProduct)
  .delete(adminOnly,deleteProduct);


// router.route('/:id').get(getUser).delete(adminOnly,deleteUser);

export default router;