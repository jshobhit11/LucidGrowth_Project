import {
  getProjects,
  addProject,
  updateProject,
  deleteProject /*, updateProject, deleteProject*/,
} from "../Controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

import express from "express";
import multer from "multer";
// import { signup, login } from "../Controllers/user_controller.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    //cb - callback
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getProjects);
router.post("/", upload.single("image"), addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
// import express from "express";
// import {
//   addProject,
//   getProjects,
//   getProjectById,
//   updateProject,
//   deleteProject,
// } from "../Controllers/projectController.js";

// const router = express.Router();

// router.post("/projects", addProject);
// router.get("/projects", getProjects);
// router.get("/projects/:id", getProjectById);
// router.put("/projects/:id", updateProject);
// router.delete("/projects/:id", deleteProject);
