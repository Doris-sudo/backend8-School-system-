import results from "../data/results.js";
import students from "../data/students.js";
import subjects from "../data/subjects.js";

import { generateId } from "../utils/generateId.js";
import {
    validId,
    validScore,
    getGrade
} from "../validators/validators.js";


export const createResult = (req, res) => {
    const {
        studentId,
        subjectId,
        score,
        term,
        session
    } = req.body;

    if (
        studentId === undefined ||
        subjectId === undefined ||
        score === undefined ||
        !term ||
        !session
    ) {
        return res.status(400).json({
            success: false,
            message: "studentId, subjectId, score, term and session are required"
        });
    }

    if (!validId(studentId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    if (!validId(subjectId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID"
        });
    }

    if (!validScore(score)) {
        return res.status(400).json({
            success: false,
            message: "Score must be a number between 0 and 100"
        });
    }

    const student = students.find(
        student => student.id === Number(studentId)
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const subject = subjects.find(
        subject => subject.id === Number(subjectId)
    );

    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found"
        });
    }

    const result = {
        id: generateId(results),
        studentId: Number(studentId),
        subjectId: Number(subjectId),
        score: Number(score),
        grade: getGrade(Number(score)),
        term,
        session,
        createdAt: new Date().toISOString()
    };

    results.push(result);

    res.status(201).json({
        success: true,
        message: "Result created successfully",
        result
    });
};


export const getResults = (req, res) => {
    if (req.user.role === "student") {
        const student = students.find(
            student =>
                student.email.toLowerCase() ===
                req.user.email.toLowerCase()
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found"
            });
        }

        const studentResults = results.filter(
            result => result.studentId === student.id
        );

        return res.status(200).json({
            success: true,
            results: studentResults
        });
    }

    res.status(200).json({
        success: true,
        count: results.length,
        results
    });
};


export const getResult = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid result ID"
        });
    }

    const result = results.find(
        result => result.id === id
    );

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Result not found"
        });
    }

    if (req.user.role === "student") {
        const student = students.find(
            student =>
                student.email.toLowerCase() ===
                req.user.email.toLowerCase()
        );

        if (!student || result.studentId !== student.id) {
            return res.status(403).json({
                success: false,
                message: "You can only view your own results"
            });
        }
    }

    res.status(200).json({
        success: true,
        result
    });
};


export const updateResult = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid result ID"
        });
    }

    const result = results.find(
        result => result.id === id
    );

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Result not found"
        });
    }

    const {
        studentId,
        subjectId,
        score,
        term,
        session
    } = req.body;

    if (
        studentId === undefined ||
        subjectId === undefined ||
        score === undefined ||
        !term ||
        !session
    ) {
        return res.status(400).json({
            success: false,
            message: "studentId, subjectId, score, term and session are required"
        });
    }

    if (!validId(studentId) || !validId(subjectId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID or subject ID"
        });
    }

    if (!validScore(score)) {
        return res.status(400).json({
            success: false,
            message: "Score must be a number between 0 and 100"
        });
    }

    const student = students.find(
        student => student.id === Number(studentId)
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const subject = subjects.find(
        subject => subject.id === Number(subjectId)
    );

    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found"
        });
    }

    result.studentId = Number(studentId);
    result.subjectId = Number(subjectId);
    result.score = Number(score);
    result.grade = getGrade(Number(score));
    result.term = term;
    result.session = session;

    res.status(200).json({
        success: true,
        message: "Result updated successfully",
        result
    });
};


export const deleteResult = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid result ID"
        });
    }

    const index = results.findIndex(
        result => result.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Result not found"
        });
    }

    results.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Result deleted successfully"
    });
};