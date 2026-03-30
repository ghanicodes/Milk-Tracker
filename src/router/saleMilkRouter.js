import express from "express";
import { 
    addSaleMilkRetailer, 
    deleteSaleMilkRetailer, 
    getSaleMilkByDateRangeRetailer, 
    getSaleMilkByDateRetailer, 
    getSaleMilkRetailer, 
    getSingleSaleMilkRetailer 
  } from "../controllers/saleMilkController.js";

const router = express.Router();


router.post('/addSaleMilkRetailer', addSaleMilkRetailer);
router.get('/getSaleMilkRetailer/:retailerId', getSaleMilkRetailer);
router.get('/getSingleSaleMilkRetailer/:retailerId/:saleId', getSingleSaleMilkRetailer);
router.get('/getSaleMilkByDateRetailer/:retailerId', getSaleMilkByDateRetailer);
router.get('/getSaleMilkByDateRangeRetailer/:retailerId', getSaleMilkByDateRangeRetailer);
router.delete('/deleteSaleMilkRetailer/:retailerId/:saleId', deleteSaleMilkRetailer);

export default router;