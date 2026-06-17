import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";

const Navbar = () => {

    console.log("[COMPONENT] Navbar rendered");

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
            <Toolbar>
                <NotificationsIcon sx={{ mr: 1.5 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Notification System
                </Typography>
                <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Campus Evaluation
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );

};

export default Navbar;
