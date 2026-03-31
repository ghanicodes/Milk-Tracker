import express from "express";
import { addDelivery, addHomeDelivery, deleteHomeDelivery, getAllHomeDeliveries, getHomeDelivery, updateHomeDelivery } from "../controllers/homeDeliveryController.js";

const router = express.Router();

router.post('/addHomeDelivery', addHomeDelivery);
router.post('/addDelivery/:customerId', addDelivery);
router.get('/getHomeDelivery/:customerId', getHomeDelivery);
router.get('/getAllHomeDeliveries', getAllHomeDeliveries);
router.put('/updateHomeDelivery/:customerId', updateHomeDelivery);
router.delete('/deleteHomeDelivery/:customerId', deleteHomeDelivery);

export default router;