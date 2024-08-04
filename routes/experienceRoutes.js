import express from "express";
// import { signup, login } from "../Controllers/user_controller.js";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience /*, updateExperience, deleteExperience*/,
} from "../Controllers/experienceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", addExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
