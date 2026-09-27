import subjects from "../data/subjects.js";
import { generateId } from "../utils/generateId.js";
import { validId } from "../validators/validators.js";

export const createSubject = (req, res) => {
    const { name, code } = req.body;

    if (!name || !code) {
        return res.status(400).json({
            success: false,
            message: "Name and code are required"
        });
    }

    const existingSubject = subjects.find(
        subject => subject.code.toLowerCase() === code.toLowerCase()
    );

    if (existingSubject) {
        return res.status(409).json({
            success: false,
            message: "Subject code already exists"
        });
    }

    const subject = {
        id: generateId(subjects),
        name,
        code,
        createdAt: new Date().toISOString()
    };

    subjects.push(subject);

    res.status(201).json({
        success: true,
        message: "Subject created successfully",
        subject
    });
};


export const getSubjects = (req, res) => {
    res.status(200).json({
        success: true,
        count: subjects.length,
        subjects
    });
};


export const getSubject = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID"
        });
    }

    const subject = subjects.find(
        subject => subject.id === id
    );

    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found"
        });
    }

    res.status(200).json({
        success: true,
        subject
    });
};


export const updateSubject = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID"
        });
    }

    const subject = subjects.find(
        subject => subject.id === id
    );

    if (!subject) {
        return res.status(404).json({
            success: false,
            message: "Subject not found"
        });
    }

    const { name, code } = req.body;

    if (!name || !code) {
        return res.status(400).json({
            success: false,
            message: "Name and code are required"
        });
    }

    const duplicateCode = subjects.find(
        item => item.id !== id && item.code.toLowerCase() === code.toLowerCase()
    );

    if (duplicateCode) {
        return res.status(409).json({
            success: false,
            message: "Subject code already exists"
        });
    }

    subject.name = name;
    subject.code = code;

    res.status(200).json({
        success: true,
        message: "Subject updated successfully",
        subject
    });
};


export const deleteSubject = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID"
        });
    }

    const index = subjects.findIndex(
        subject => subject.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Subject not found"
        });
    }

    subjects.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Subject deleted successfully"
    });
};