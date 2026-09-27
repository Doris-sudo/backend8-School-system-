import teachers from "../data/teachers.js";
import subjects from "../data/subjects.js";
import { generateId } from "../utils/generateId.js";
import {
    validEmail,
    validId
} from "../validators/validators.js";

export const createTeacher = (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            subjectId
        } = req.body;

        if (!name || !email || !phone || !subjectId) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone and subjectId are required"
            });
        }

        if (!validEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (!validId(subjectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid subject ID"
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

        const existingTeacher = teachers.find(
            teacher => teacher.email.toLowerCase() === email.toLowerCase()
        );

        if (existingTeacher) {
            return res.status(409).json({
                success: false,
                message: "Teacher email already exists"
            });
        }

        const teacher = {
            id: generateId(teachers),
            name,
            email,
            phone,
            subjectId: Number(subjectId),
            createdAt: new Date().toISOString()
        };

        teachers.push(teacher);

        res.status(201).json({
            success: true,
            message: "Teacher created successfully",
            teacher
        });

    } catch (error) {
        next(error);
    }
};


export const getTeachers = (req, res) => {
    res.status(200).json({
        success: true,
        count: teachers.length,
        teachers
    });
};


export const getTeacher = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid teacher ID"
        });
    }

    const teacher = teachers.find(
        teacher => teacher.id === id
    );

    if (!teacher) {
        return res.status(404).json({
            success: false,
            message: "Teacher not found"
        });
    }

    res.status(200).json({
        success: true,
        teacher
    });
};


export const updateTeacher = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid teacher ID"
        });
    }

    const teacher = teachers.find(
        teacher => teacher.id === id
    );

    if (!teacher) {
        return res.status(404).json({
            success: false,
            message: "Teacher not found"
        });
    }

    const {
        name,
        email,
        phone,
        subjectId
    } = req.body;

    if (!name || !email || !phone || !subjectId) {
        return res.status(400).json({
            success: false,
            message: "Name, email, phone and subjectId are required"
        });
    }

    if (!validEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    if (!validId(subjectId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid subject ID"
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

    const duplicateEmail = teachers.find(
        item => item.id !== id && item.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicateEmail) {
        return res.status(409).json({
            success: false,
            message: "Teacher email already exists"
        });
    }

    teacher.name = name;
    teacher.email = email;
    teacher.phone = phone;
    teacher.subjectId = Number(subjectId);

    res.status(200).json({
        success: true,
        message: "Teacher updated successfully",
        teacher
    });
};


export const deleteTeacher = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid teacher ID"
        });
    }

    const index = teachers.findIndex(
        teacher => teacher.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Teacher not found"
        });
    }

    teachers.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Teacher deleted successfully"
    });
};