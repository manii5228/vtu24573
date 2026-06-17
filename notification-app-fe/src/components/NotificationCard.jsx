import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const getTypeColor = (type) => {
    switch (type) {
        case "warning": return "warning";
        case "alert": return "error";
        case "reminder": return "secondary";
        case "update": return "success";
        default: return "info";
    }
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case "urgent": return "#d32f2f";
        case "high": return "#f57c00";
        case "medium": return "#1976d2";
        default: return "#388e3c";
    }
};

const NotificationCard = ({ notification, onMarkRead, onDelete }) => {

    return (
        <Card
            sx={{
                mb: 2,
                borderLeft: `4px solid ${getPriorityColor(notification.priority)}`,
                opacity: notification.status === "read" ? 0.7 : 1,
                backgroundColor: notification.status === "unread" ? "#fafafa" : "#f0f0f0"
            }}
        >
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="h6" component="div">
                        {notification.title}
                    </Typography>
                    <Box>
                        <Chip
                            label={notification.type}
                            color={getTypeColor(notification.type)}
                            size="small"
                            sx={{ mr: 1 }}
                        />
                        <Chip
                            label={notification.priority}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: getPriorityColor(notification.priority), color: getPriorityColor(notification.priority) }}
                        />
                    </Box>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    {notification.message}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                    <Chip
                        label={notification.status}
                        size="small"
                        color={notification.status === "unread" ? "primary" : "default"}
                        variant="outlined"
                    />
                </Box>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
                {notification.status === "unread" && (
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onMarkRead(notification.id)}
                        title="Mark as read"
                    >
                        <MarkEmailReadIcon />
                    </IconButton>
                )}
                <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(notification.id)}
                    title="Delete"
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );

};

export default NotificationCard;
