import express from "express";
import notificationController from "../controllers/notification.controller.js";
import validateNotification from "../middleware/validation.middleware.js";

const router = express.Router();

// GET all notifications
router.get("/", notificationController.getAllNotifications);

// GET single notification
router.get("/:id", notificationController.getNotificationById);

// POST create notification
router.post("/", validateNotification, notificationController.createNotification);

// PATCH mark as read
router.patch("/:id/read", notificationController.markAsRead);

// DELETE notification
router.delete("/:id", notificationController.deleteNotification);

export default router;
