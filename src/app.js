import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(logger);


// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "School Management API is running..."
    });
});


// Authentication
app.use("/api/auth", authRoutes);


// Students
app.use("/api/students", studentRoutes);


// Teachers
app.use("/api/teachers", teacherRoutes);


// Classes
app.use("/api/classes", classRoutes);


// Subjects
app.use("/api/subjects", subjectRoutes);


// Results
app.use("/api/results", resultRoutes);


// Route not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// Global error handler
app.use(errorHandler);

export default app;