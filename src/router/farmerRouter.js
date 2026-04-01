import express from "express";
import { addFarmer, getAllFarmers, getSingleFarmer, updateFarmer, deleteFarmer, getFarmerByPhone, addFarmerPayment } from "../controllers/farmerController.js";

const router = express.Router();

router.post('/addFarmer', addFarmer);
router.get('/getFarmers', getAllFarmers);
router.get('/getFarmer/:id', getSingleFarmer);
router.put('/updateFarmer/:id', updateFarmer);
router.delete('/deleteFarmer/:id', deleteFarmer);
router.get('/getFarmerByPhone/:phone', getFarmerByPhone);
router.post('/addFarmerPayment/:id', addFarmerPayment);

export default router;