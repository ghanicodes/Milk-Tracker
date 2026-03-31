import express from "express";
import { addRetailer, deleteRetailer, getRetailer, getSingleRetailer, updateRetailer } from "../controllers/retailerController.js";

const router = express.Router();

router.post('/addRetailer', addRetailer);
router.get('/getRetailer', getRetailer);
router.get('/getSingleRetailer/:retailerId', getSingleRetailer);
router.put('/updateRetailer/:retailerId', updateRetailer);
router.delete('/deleteRetailer/:retailerId', deleteRetailer);


export default router;
