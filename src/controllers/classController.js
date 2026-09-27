import classes from "../data/classes.js";
import { generateId } from "../utils/generateId.js";
import { validId } from "../validators/validators.js";

export const createClass = (req, res) => {
    const { name, level } = req.body;

    if (!name || !level) {
        return res.status(400).json({
            success: false,
            message: "Name and level are required"
        });
    }

    const schoolClass = {
        id: generateId(classes),
        name,
        level,
        createdAt: new Date().toISOString()
    };

    classes.push(schoolClass);

    res.status(201).json({
        success: true,
        message: "Class created successfully",
        class: schoolClass
    });
};


export const getClasses = (req, res) => {
    res.status(200).json({
        success: true,
        count: classes.length,
        classes
    });
};


export const getClass = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid class ID"
        });
    }

    const schoolClass = classes.find(
        item => item.id === id
    );

    if (!schoolClass) {
        return res.status(404).json({
            success: false,
            message: "Class not found"
        });
    }

    res.status(200).json({
        success: true,
        class: schoolClass
    });
};


export const updateClass = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid class ID"
        });
    }

    const schoolClass = classes.find(
        item => item.id === id
    );

    if (!schoolClass) {
        return res.status(404).json({
            success: false,
            message: "Class not found"
        });
    }

    const { name, level } = req.body;

    if (!name || !level) {
        return res.status(400).json({
            success: false,
            message: "Name and level are required"
        });
    }

    schoolClass.name = name;
    schoolClass.level = level;

    res.status(200).json({
        success: true,
        message: "Class updated successfully",
        class: schoolClass
    });
};


export const deleteClass = (req, res) => {
    const id = Number(req.params.id);

    if (!validId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid class ID"
        });
    }

    const index = classes.findIndex(
        item => item.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Class not found"
        });
    }

    classes.splice(index, 1);

    res.status(200).json({
        success: true,
        message: "Class deleted successfully"
    });
};