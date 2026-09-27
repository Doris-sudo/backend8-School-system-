import express from "express";

import {
    createClass,
    getClasses,
    getClass,
    updateClass,
    deleteClass
} from "../controllers/classController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("admin"),
    createClass
);

router.get(
    "/",
    authenticate,
    authorize("admin", "teacher", "student"),
    getClasses
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "teacher", "student"),
    getClass
);

router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateClass
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteClass
);

export default router;