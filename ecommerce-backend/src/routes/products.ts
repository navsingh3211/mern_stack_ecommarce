import express from "express";//1:53hour

import {newProduct} from '../controllers/product.js'
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post('/new',singleUpload,newProduct);
// router.get('/all',adminOnly,getAllUsers);


// router.route('/:id').get(getUser).delete(adminOnly,deleteUser);

export default router;