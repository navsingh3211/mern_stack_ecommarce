import express from "express";//2:16hour

import {newProduct,getLatestProducts} from '../controllers/product.js'
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post('/new',adminOnly,singleUpload,newProduct);
router.get('/latest',getLatestProducts);


// router.route('/:id').get(getUser).delete(adminOnly,deleteUser);

export default router;