import express from "express";//6:05hour

import {
  getDashboardStats,
  getPieChats,
  getBarChats,
  getLineChats
} from '../controllers/stats.js';
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.get('/stats',adminOnly,getDashboardStats);

router.get('/pie',adminOnly,getPieChats);

router.get('/bar',adminOnly,getBarChats);

router.get('/line',adminOnly,getLineChats);





// router.get('/:id',getUser);
// router.get('/delete/:id',deleteUser);
// router.route('/:id').get(getUser).delete(adminOnly,deleteUser);

export default router;