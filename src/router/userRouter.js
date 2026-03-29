import express from "express";
import {adminDashboard, adminLogin, adminLogout} from "../controllers/userController.js";

const router = express.Router();

router.post("/admin/login", adminLogin);
router.get("/adminDashboard", adminDashboard);
router.post("/admin/logout", adminLogout);


export default router;