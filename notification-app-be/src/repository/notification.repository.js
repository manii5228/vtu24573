import { v4 as uuidv4 } from "uuid";
import log from "../utils/logger.js";

// in memory store since we dont have a db
let notifications = [];

const getAllNotifications = async () => {

    try {

        return notifications;

    } catch (error) {

        await log("backend", "error", "repository", `Failed to fetch notifications: ${error.message}`);
        throw error;

    }

};

const getNotificationById = async (id) => {

    try {

        const notification = notifications.find(n => n.id === id);
        return notification || null;

    } catch (error) {

        await log("backend", "error", "repository", `Failed to fetch notification by id: ${error.message}`);
        throw error;

    }

};

const createNotification = async (data) => {

    try {

        const newNotification = {
            id: uuidv4(),
            title: data.title,
            message: data.message,
            type: data.type || "info",
            priority: data.priority || "medium",
            status: "unread",
            createdAt: new Date().toISOString()
        };

        notifications.push(newNotification);
        return newNotification;

    } catch (error) {

        await log("backend", "error", "repository", `Failed to create notification: ${error.message}`);
        throw error;

    }

};

const markAsRead = async (id) => {

    try {

        const index = notifications.findIndex(n => n.id === id);

        if (index === -1) return null;

        notifications[index].status = "read";
        return notifications[index];

    } catch (error) {

        await log("backend", "error", "repository", `Failed to update notification: ${error.message}`);
        throw error;

    }

};

const deleteNotification = async (id) => {

    try {

        const index = notifications.findIndex(n => n.id === id);

        if (index === -1) return null;

        const deleted = notifications.splice(index, 1);
        return deleted[0];

    } catch (error) {

        await log("backend", "error", "repository", `Failed to delete notification: ${error.message}`);
        throw error;

    }

};

export default {
    getAllNotifications,
    getNotificationById,
    createNotification,
    markAsRead,
    deleteNotification
};
