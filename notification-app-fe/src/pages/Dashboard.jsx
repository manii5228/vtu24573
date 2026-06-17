import { useState, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import NotificationForm from "../components/NotificationForm";
import NotificationList from "../components/NotificationList";
import useNotifications from "../hooks/useNotifications";
import { markAsRead, deleteNotification } from "../api/notificationApi";

const Dashboard = () => {

    const { notifications, loading, error, refetch } = useNotifications();
    const [actionError, setActionError] = useState(null);

    console.log("[PAGE] Dashboard rendered");

    const handleMarkRead = useCallback(async (id) => {

        try {

            await markAsRead(id);
            console.log("[PAGE] Marked notification as read:", id);
            refetch();

        } catch (err) {

            console.error("[PAGE] Error marking as read:", err.message);
            setActionError("Failed to mark as read");

        }

    }, [refetch]);

    const handleDelete = useCallback(async (id) => {

        try {

            await deleteNotification(id);
            console.log("[PAGE] Deleted notification:", id);
            refetch();

        } catch (err) {

            console.error("[PAGE] Error deleting notification:", err.message);
            setActionError("Failed to delete notification");

        }

    }, [refetch]);

    const unreadCount = notifications.filter(n => n.status === "unread").length;

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>

            {/* stats section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="h4" color="primary">{notifications.length}</Typography>
                        <Typography variant="body2" color="text.secondary">Total</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="h4" color="warning.main">{unreadCount}</Typography>
                        <Typography variant="body2" color="text.secondary">Unread</Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                        <Typography variant="h4" color="success.main">{notifications.length - unreadCount}</Typography>
                        <Typography variant="body2" color="text.secondary">Read</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3}>

                {/* form section */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <NotificationForm onCreated={refetch} />
                </Grid>

                {/* list section */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <NotificationList
                        notifications={notifications}
                        loading={loading}
                        error={error || actionError}
                        onMarkRead={handleMarkRead}
                        onDelete={handleDelete}
                    />
                </Grid>

            </Grid>

        </Container>
    );

};

export default Dashboard;
