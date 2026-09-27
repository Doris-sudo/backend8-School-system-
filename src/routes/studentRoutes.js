import express from "express";

import {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("admin"),
    createStudent
);

router.get(
    "/",
    authenticate,
    authorize("admin", "teacher"),
    getStudents
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "teacher", "student"),
    getStudent
);

router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateStudent
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteStudent
);

export default router;