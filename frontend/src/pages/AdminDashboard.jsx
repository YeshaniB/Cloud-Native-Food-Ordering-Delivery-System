// AdminDashboard.jsx
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    CssBaseline,
    useTheme,
    Divider,
} from "@mui/material";
import {
    Menu as MenuIcon,
    AccountCircle,
    Logout,
    Store,
    ShoppingCart,
    RestaurantMenu,
    LocalShipping,
} from "@mui/icons-material";

const drawerWidth = 240;

const navItems = [
    { text: "User Management", icon: <Store /> },
    { text: "Order Management", icon: <ShoppingCart /> },
    { text: "Menu Management", icon: <RestaurantMenu /> },
    { text: "Delivery Management", icon: <LocalShipping /> },
];

const AdminDashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ backgroundColor: "#081b2c", height: "100%" }}>
            <Typography variant="h6" sx={{ color: "#00ffff", m: 2 }}>
                ADMIN PANEL
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        sx={{
                            color: "white",
                            ":hover": { backgroundColor: "#0d2a45", color: "#00ffff" },
                        }}
                    >
                        <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#112d44",
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Button variant="outlined" sx={{ color: "#00ffff", borderColor: "#00ffff", mr: 2 }}>
                        CUSTOMER VIEW
                    </Button>
                    <IconButton sx={{ color: "#00ffff" }}>
                        <AccountCircle />
                    </IconButton>
                    <Typography sx={{ mr: 2 }}>admin@example.com</Typography>
                    <IconButton sx={{ color: "#00ffff" }}>
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: "#081b2c",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: "#081b2c",
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: "white",
                    minHeight: "100vh",
                }}
            >
                <Toolbar />
                <Typography>Dashboard content will go here.</Typography>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
