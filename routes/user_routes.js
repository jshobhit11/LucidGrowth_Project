import express from "express";
import { signup, login, logout } from "../Controllers/user_controller.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/logout", logout);
// router.get("/status", authMiddleware);

export default router;
