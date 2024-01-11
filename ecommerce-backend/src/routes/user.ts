import express from "express";

import {newUser,getAllUsers,getUser,deleteUser} from '../controllers/user.js'
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new',newUser);
router.get('/all',adminOnly,getAllUsers);


// router.get('/:id',getUser);
// router.get('/delete/:id',deleteUser);
router.route('/:id').get(getUser).delete(adminOnly,deleteUser);

export default router;