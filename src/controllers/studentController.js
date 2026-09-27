import students from "../data/students.js";
import classes from "../data/classes.js";
import { generateId } from "../utils/generateId.js";
import {
    validEmail,
    validId
} from "../validators/validators.js";

export const createStudent = (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            classId
        } = req.body;

        if (!name || !email || !phone || !classId) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone and classId are required"
            });
        }

        if (!validEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (!validId(classId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid class ID"
            });
        }

        const schoolClass = classes.find(
            item => item.id === Number(classId)
        );

        if (!schoolClass) {
            return res.status(404).json({
                success: false,
                message: "Class not found"
            });
        }

        const existingStudent = students.find(
            student => student.email.toLowerCase() === email.toLowerCase()
        );

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "Student email already exists"
            });
        }

        const student = {
            id: generateId(students),
            name,
            email,
            phone,
            classId: Number(classId),
            createdAt: new Date().toISOString()
        };

        students.push(student);

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student
        });

    } catch (error) {
        next(error);
    }
};


export const getStudents = (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        students
    });
};


export const getStudent = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    // Students can only view themselves
    if (
        req.user.role === "student" &&
        req.user.email.toLowerCase() !== student.email.toLowerCase()
    ) {
        return res.status(403).json({
            success: false,
            message: "You can only view your own profile"
        });
    }

    res.status(200).json({
        success: true,
        student
    });
};


export const updateStudent = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const {
        name,
        email,
        phone,
        classId
    } = req.body;

    if (!name || !email || !phone || !classId) {
        return res.status(400).json({
            success: false,
            message: "Name, email, phone and classId are required"
        });
    }

    if (!validEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    if (!validId(classId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid class ID"
        });
    }

    const schoolClass = classes.find(
        item => item.id === Number(classId)
    );

    if (!schoolClass) {
        return res.status(404).json({
            success: false,
            message: "Class not found"
        });
    }

    const duplicateEmail = students.find(
        item => item.id !== id && item.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicateEmail) {
        return res.status(409).json({
            success: false,
            message: "Student email already exists"
        });
    }

    student.name = name;
    student.email = email;
    student.phone = phone;
    student.classId = Number(classId);

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student
    });
};


export const deleteStudent = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });
};