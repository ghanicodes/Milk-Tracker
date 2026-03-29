import express from "express";
import { addMilkCollection } from "../controllers/milkController.js";

const router = express.Router();

router.post('/addMilk', addMilkCollection);


export default router;