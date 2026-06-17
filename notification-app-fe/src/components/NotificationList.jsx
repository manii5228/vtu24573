import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import NotificationCard from "./NotificationCard";

const NotificationList = ({ notifications, loading, error, onMarkRead, onDelete }) => {

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {error}
            </Alert>
        );
    }

    if (!notifications || notifications.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                    No notifications yet. Create one above!
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Notifications ({notifications.length})
            </Typography>

            {notifications.map((notification) => (
                <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkRead={onMarkRead}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );

};

export default NotificationList;
