import express from "express";
import { addFarmer } from "../controllers/farmerController.js";

const router = express.Router();

router.post('/addFarmer', addFarmer)


export default router;