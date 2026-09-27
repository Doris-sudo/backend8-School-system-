import express from "express";

import {
    createResult,
    getResults,
    getResult,
    updateResult,
    deleteResult
} from "../controllers/resultController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("admin", "teacher"),
    createResult
);

router.get(
    "/",
    authenticate,
    authorize("admin", "teacher", "student"),
    getResults
);

router.get(
    "/:id",
    authenticate,
    authorize("admin", "teacher", "student"),
    getResult
);

router.put(
    "/:id",
    authenticate,
    authorize("admin", "teacher"),
    updateResult
);

router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    deleteResult
);

export default router;