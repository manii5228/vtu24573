import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import { createNotification } from "../api/notificationApi";

const TYPES = ["info", "warning", "alert", "reminder", "update"];
const PRIORITIES = ["low", "medium", "high", "urgent"];

const NotificationForm = ({ onCreated }) => {

    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "info",
        priority: "medium"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {

            await createNotification(formData);

            console.log("[PAGE] Notification created successfully");

            setSuccess(true);
            setFormData({ title: "", message: "", type: "info", priority: "medium" });

            if (onCreated) onCreated();

            // hide success message after 3 sec
            setTimeout(() => setSuccess(false), 3000);

        } catch (err) {

            console.error("[PAGE] Error creating notification:", err.message);
            setError(err.response?.data?.message || "Failed to create notification");

        } finally {

            setLoading(false);

        }

    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>

            <Typography variant="h6" sx={{ mb: 2 }}>
                Create Notification
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Notification created!</Alert>}

            <Box component="form" onSubmit={handleSubmit}>

                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    size="small"
                />

                <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    size="small"
                />

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                    >
                        {TYPES.map((t) => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        select
                        fullWidth
                        size="small"
                    >
                        {PRIORITIES.map((p) => (
                            <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={loading}
                    fullWidth
                >
                    {loading ? "Creating..." : "Create Notification"}
                </Button>

            </Box>

        </Paper>
    );

};

export default NotificationForm;
