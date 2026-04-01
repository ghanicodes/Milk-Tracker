import express from "express";
import { addDelivery, addHomeDelivery, deleteHomeDelivery, getAllHomeDeliveries, getHomeDelivery, updateHomeDelivery, getMyHomeDelivery } from "../controllers/homeDeliveryController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/addHomeDelivery', addHomeDelivery);
router.post('/addDelivery/:customerId', addDelivery);
router.get('/getHomeDelivery/:customerId', getHomeDelivery);
router.get('/getAllHomeDeliveries', getAllHomeDeliveries);
router.put('/updateHomeDelivery/:customerId', updateHomeDelivery);
router.delete('/deleteHomeDelivery/:customerId', deleteHomeDelivery);
router.get('/myDelivery', verifyUser, getMyHomeDelivery);

export default router;