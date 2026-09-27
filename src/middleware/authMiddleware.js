import jwt from "jsonwebtoken";
import users from "../data/users.js";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(503).json({
                success: false,
                message: "Authentication is not configured"
            });
        }

        const bearerMatch = authHeader.match(/^Bearer\s+(\S+)$/i);
        const token = bearerMatch?.[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = users.find(
            user => user.id === decoded.userId
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};