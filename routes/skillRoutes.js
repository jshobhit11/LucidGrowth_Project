import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill /*, updateSkill, deleteSkill*/,
} from "../Controllers/skillController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";
// import { signup, login } from "../Controllers/user_controller.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", addSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

export default router;
