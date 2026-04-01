import express from "express";
import { 
  addMilk, 
  deleteOpenRateMilk, 
  getAllOpenRateMilk, 
  getOpenRateMilkByDate, 
  getOpenRateMilkByShift, 
  getSingleOpenRateMilk, 
  updateOpenRateMilk 
} from "../controllers/openRateMilkController.js";

const router = express.Router();

router.post('/addOpenMilk', addMilk);
router.get('/getOpenMilk', getAllOpenRateMilk);
router.get('/getOpenMilk/:id', getSingleOpenRateMilk);
router.put('/updateOpenMilk/:id', updateOpenRateMilk);
router.delete('/deleteOpenMilk/:id', deleteOpenRateMilk);
router.get('/getOpenMilkByDate/:date', getOpenRateMilkByDate);
router.get('/getOpenMilkByShift/:shift', getOpenRateMilkByShift);

export default router;