import express from "express";
import {adminDashboard, login, adminLogout, userDashboard} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/adminDashboard", verifyAdmin, adminDashboard);
router.get("/userDashboard", verifyUser, userDashboard);
router.post("/logout", adminLogout);

export default router;