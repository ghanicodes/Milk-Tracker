import express from "express";
import { 
  addMilkCollection, 
  getAllMilkCollections, 
  getMilkCollection, 
  updateMilkCollection, 
  deleteMilkCollection,
  getMilkCollectionByDate,
  getMilkCollectionByDateRange,
  getMilkCollectionByFarmerAndDate,
  getMilkCollectionByFarmerAndDateRange,
  getMilkCollectionByFarmerAndMilkType
} from "../controllers/milkController.js";

const router = express.Router();

router.post('/addMilk/:farmerId', addMilkCollection);
router.get('/getMilkCollections', getAllMilkCollections);
router.get('/getMilkCollection/:farmerId', getMilkCollection);
router.put('/updateMilkCollection/:id', updateMilkCollection);
router.delete('/deleteMilkCollection/:id', deleteMilkCollection);

router.get('/getMilkCollectionByDate/:date', getMilkCollectionByDate);
router.get('/getMilkCollectionByDateRange/:startDate/:endDate', getMilkCollectionByDateRange);
router.get('/getMilkCollectionByFarmerAndDate/:farmerId/:date', getMilkCollectionByFarmerAndDate);
router.get('/getMilkCollectionByFarmerAndDateRange/:farmerId/:startDate/:endDate', getMilkCollectionByFarmerAndDateRange);
router.get('/getMilkCollectionByFarmerAndMilkType/:farmerId/:milkType', getMilkCollectionByFarmerAndMilkType);

export default router;