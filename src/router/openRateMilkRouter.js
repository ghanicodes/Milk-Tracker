import { addMilk } from "../controllers/openRateMilkController.js";
import express from "express";

const router = express.Router();

router.post('/addOpenMilk', addMilk);

export default router;