import express from "express";

import {
	createTeacher,
	getTeachers,
	getTeacher,
	updateTeacher,
	deleteTeacher
} from "../controllers/teacherController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/", authenticate, authorize("admin"), createTeacher);
router.get("/", authenticate, authorize("admin", "teacher"), getTeachers);
router.get("/:id", authenticate, authorize("admin", "teacher"), getTeacher);
router.put("/:id", authenticate, authorize("admin"), updateTeacher);
router.delete("/:id", authenticate, authorize("admin"), deleteTeacher);

export default router;