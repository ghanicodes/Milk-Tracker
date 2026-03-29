import express from "express";
import {adminDashboard, adminLogin, adminLogout} from "../controllers/userController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.get("/adminDashboard", verifyAdmin, adminDashboard);
router.post("/admin/logout", adminLogout);


export default router;