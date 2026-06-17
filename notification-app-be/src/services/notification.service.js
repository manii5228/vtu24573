import notificationRepository from "../repository/notification.repository.js";
import log from "../utils/logger.js";

const getAllNotifications = async () => {

    try {

        const notifications = await notificationRepository.getAllNotifications();

        await log("backend", "info", "service", "Fetched all notifications successfully");

        return notifications;

    } catch (error) {

        await log("backend", "error", "service", `Service error fetching notifications: ${error.message}`);
        throw error;

    }

};

const getNotificationById = async (id) => {

    try {

        const notification = await notificationRepository.getNotificationById(id);

        if (!notification) {

            await log("backend", "info", "service", `Notification not found with id: ${id}`);
            return null;

        }

        await log("backend", "info", "service", `Fetched notification ${id}`);
        return notification;

    } catch (error) {

        await log("backend", "error", "service", `Service error fetching notification: ${error.message}`);
        throw error;

    }

};

const createNotification = async (data) => {

    try {

        const notification = await notificationRepository.createNotification(data);

        await log("backend", "info", "service", `Created notification: ${notification.id}`);

        return notification;

    } catch (error) {

        await log("backend", "error", "service", `Service error creating notification: ${error.message}`);
        throw error;

    }

};

const markAsRead = async (id) => {

    try {

        const notification = await notificationRepository.markAsRead(id);

        if (!notification) {

            await log("backend", "info", "service", `Cannot mark as read, notification not found: ${id}`);
            return null;

        }

        await log("backend", "info", "service", `Marked notification ${id} as read`);
        return notification;

    } catch (error) {

        await log("backend", "error", "service", `Service error marking notification as read: ${error.message}`);
        throw error;

    }

};

const deleteNotification = async (id) => {

    try {

        const notification = await notificationRepository.deleteNotification(id);

        if (!notification) {

            await log("backend", "info", "service", `Cannot delete, notification not found: ${id}`);
            return null;

        }

        await log("backend", "info", "service", `Deleted notification: ${id}`);
        return notification;

    } catch (error) {

        await log("backend", "error", "service", `Service error deleting notification: ${error.message}`);
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
