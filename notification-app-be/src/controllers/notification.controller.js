import notificationService from "../services/notification.service.js";
import log from "../utils/logger.js";

const getAllNotifications = async (req, res, next) => {

    try {

        const notifications = await notificationService.getAllNotifications();

        await log("backend", "info", "controller", "Fetched all notifications");

        res.status(200).json({
            success: true,
            data: notifications,
            count: notifications.length
        });

    } catch (error) {

        await log("backend", "error", "controller", `Error fetching notifications: ${error.message}`);
        next(error);

    }

};

const getNotificationById = async (req, res, next) => {

    try {

        const { id } = req.params;
        const notification = await notificationService.getNotificationById(id);

        if (!notification) {

            await log("backend", "info", "controller", `Notification not found: ${id}`);

            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });

        }

        await log("backend", "info", "controller", `Fetched notification ${id}`);

        res.status(200).json({
            success: true,
            data: notification
        });

    } catch (error) {

        await log("backend", "error", "controller", `Error fetching notification: ${error.message}`);
        next(error);

    }

};

const createNotification = async (req, res, next) => {

    try {

        const notification = await notificationService.createNotification(req.body);

        await log("backend", "info", "controller", `Created notification: ${notification.id}`);

        res.status(201).json({
            success: true,
            data: notification,
            message: "Notification created successfully"
        });

    } catch (error) {

        await log("backend", "error", "controller", `Error creating notification: ${error.message}`);
        next(error);

    }

};

const markAsRead = async (req, res, next) => {

    try {

        const { id } = req.params;
        const notification = await notificationService.markAsRead(id);

        if (!notification) {

            await log("backend", "info", "controller", `Cannot mark as read, not found: ${id}`);

            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });

        }

        await log("backend", "info", "controller", `Marked notification ${id} as read`);

        res.status(200).json({
            success: true,
            data: notification,
            message: "Notification marked as read"
        });

    } catch (error) {

        await log("backend", "error", "controller", `Error updating notification: ${error.message}`);
        next(error);

    }

};

const deleteNotification = async (req, res, next) => {

    try {

        const { id } = req.params;
        const notification = await notificationService.deleteNotification(id);

        if (!notification) {

            await log("backend", "info", "controller", `Cannot delete, not found: ${id}`);

            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });

        }

        await log("backend", "info", "controller", `Deleted notification: ${id}`);

        res.status(200).json({
            success: true,
            data: notification,
            message: "Notification deleted"
        });

    } catch (error) {

        await log("backend", "error", "controller", `Error deleting notification: ${error.message}`);
        next(error);

    }

};

export default {
    getAllNotifications,
    getNotificationById,
    createNotification,
    markAsRead,
    deleteNotification
};
