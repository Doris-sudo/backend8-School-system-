import express from "express";

import {
    createSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject
} from "../controllers/subjectController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("admin"),
    createSubject
);

router.get(
    "/",
    authenticate,
    authorize("admin", "teacher", "student"),
    getSubjects
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "teacher", "student"),
    getSubject
);

router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateSubject
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteSubject
);

export default router;