import { useState, useEffect, useCallback } from "react";
import { getNotifications } from "../api/notificationApi";

const useNotifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async () => {

        try {

            setLoading(true);
            setError(null);

            const response = await getNotifications();
            setNotifications(response.data || []);

            console.log("[HOOK] Notifications loaded");

        } catch (err) {

            setError(err.response?.data?.message || "Failed to load notifications");
            console.error("[HOOK] Error:", err.message);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchNotifications();

    }, [fetchNotifications]);

    return {
        notifications,
        loading,
        error,
        refetch: fetchNotifications
    };

};

export default useNotifications;
