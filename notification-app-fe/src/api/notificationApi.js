import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

// get all notifications
export const getNotifications = async () => {

    try {

        const response = await api.get("/notifications");
        console.log("[API] Fetched notifications");
        return response.data;

    } catch (error) {

        console.error("[API] Error fetching notifications:", error.message);
        throw error;

    }

};

// get single notification
export const getNotificationById = async (id) => {

    try {

        const response = await api.get(`/notifications/${id}`);
        console.log("[API] Fetched notification:", id);
        return response.data;

    } catch (error) {

        console.error("[API] Error fetching notification:", error.message);
        throw error;

    }

};

// create notification
export const createNotification = async (data) => {

    try {

        const response = await api.post("/notifications", data);
        console.log("[API] Created notification");
        return response.data;

    } catch (error) {

        console.error("[API] Error creating notification:", error.message);
        throw error;

    }

};

// mark notification as read
export const markAsRead = async (id) => {

    try {

        const response = await api.patch(`/notifications/${id}/read`);
        console.log("[API] Marked as read:", id);
        return response.data;

    } catch (error) {

        console.error("[API] Error marking as read:", error.message);
        throw error;

    }

};

// delete notification
export const deleteNotification = async (id) => {

    try {

        const response = await api.delete(`/notifications/${id}`);
        console.log("[API] Deleted notification:", id);
        return response.data;

    } catch (error) {

        console.error("[API] Error deleting notification:", error.message);
        throw error;

    }

};

export default api;
