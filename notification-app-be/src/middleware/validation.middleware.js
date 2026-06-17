import log from "../utils/logger.js";
import { NOTIFICATION_TYPES, PRIORITY_LEVELS } from "../constants/notification.constants.js";

const validateNotification = async (req, res, next) => {

    const { title, message, type, priority } = req.body;

    // title is required
    if (!title || title.trim() === "") {

        await log("backend", "warn", "middleware", "Validation failed: title is required");

        return res.status(400).json({
            success: false,
            message: "Title is required"
        });

    }

    // message is required
    if (!message || message.trim() === "") {

        await log("backend", "warn", "middleware", "Validation failed: message is required");

        return res.status(400).json({
            success: false,
            message: "Message is required"
        });

    }

    // validate type if provided
    if (type && !NOTIFICATION_TYPES.includes(type)) {

        await log("backend", "warn", "middleware", `Validation failed: invalid type ${type}`);

        return res.status(400).json({
            success: false,
            message: `Invalid type. Allowed: ${NOTIFICATION_TYPES.join(", ")}`
        });

    }

    // validate priority if provided
    if (priority && !PRIORITY_LEVELS.includes(priority)) {

        await log("backend", "warn", "middleware", `Validation failed: invalid priority ${priority}`);

        return res.status(400).json({
            success: false,
            message: `Invalid priority. Allowed: ${PRIORITY_LEVELS.join(", ")}`
        });

    }

    next();

};

export default validateNotification;
