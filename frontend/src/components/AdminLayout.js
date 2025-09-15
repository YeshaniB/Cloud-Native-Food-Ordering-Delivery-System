import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
    Fastfood,
} from "@mui/icons-material";

const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const drawerWidth = collapsed ? 70 : 240;

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const navItems = [
        { text: "User Management", icon: <Store />, path: "/admin/user-management" },
        { text: "Order Management", icon: <ShoppingCart />, path: "/admin/orders" },
        { text: "Menu Management", icon: <RestaurantMenu />, path: "/admin/menu" },
        { text: "Delivery Management", icon: <LocalShipping />, path: "/dashboard" },
    ];

    const hoverColors = ["#C1C454", "#FDB70D", "#C1C454", "#FDB70D"];

    const drawer = (
        <Box sx={{ backgroundColor: "#111920", height: "100%", transition: "width 0.3s" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "64px",
                }}
            >
                {collapsed ? <Fastfood sx={{ color: "#FDB70D", fontSize: 30 }} /> : (
                    <Typography variant="h6" sx={{ color: "#FDB70D" }}>
                        CraveExpress
                    </Typography>
                )}
            </Box>
            <Divider sx={{ backgroundColor: "#FDB70D" }} />
            <List>
                {navItems.map((item, index) => {
                    const hoverColor = hoverColors[index % hoverColors.length];
                    const isActive = location.pathname.startsWith(item.path);

                    return (
                        <ListItem
                            key={item.text}
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: "#FFFFFF",
                                backgroundColor: isActive ? "#C1C454" : "transparent",
                                borderLeft: isActive ? "5px solid #C1C454" : "none",
                                ":hover": {
                                    backgroundColor: hoverColor,
                                    color: "#111920",
                                },
                                justifyContent: collapsed ? "center" : "flex-start",
                                transition: "all 0.3s",
                            }}
                        >
                            <ListItemIcon sx={{ color: "#FFFFFF", minWidth: collapsed ? "auto" : "40px", justifyContent: "center" }}>
                                {item.icon}
                            </ListItemIcon>
                            {!collapsed && <ListItemText primary={item.text} />}
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    const handleLogout = async () => {
        try {
            await fetch("", {
                method: "POST",
                credentials: "include",
            });
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "#31314c",
                    boxShadow: "0 0 10px #FDB70D",
                    transition: "width 0.3s, margin 0.3s",
                    marginTop: 0,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={() => setCollapsed(!collapsed)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "#FDB70D" }}>
                        Admin Panel
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "#C1C454",
                            borderColor: "#C1C454",
                            mr: 2,
                            ":hover": { borderColor: "#FDB70D", color: "#FDB70D" },
                        }}
                    >
                        CUSTOMER VIEW
                    </Button>
                    <IconButton sx={{ color: "#FDB70D" }}>
                        <AccountCircle />
                    </IconButton>
                    <Typography sx={{ mr: 2, color: "#FFFFFF" }}>admin@example.com</Typography>
                    <IconButton sx={{ color: "#FDB70D" }} onClick={handleLogout}>
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, transition: "width 0.3s" }}>
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
                            backgroundColor: "#111920",
                            transition: "width 0.3s",
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
                            backgroundColor: "#111920",
                            transition: "width 0.3s",
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
                    backgroundColor: "#ffffff",
                    minHeight: "100vh",
                    transition: "width 0.3s, margin 0.3s",
                }}
            >
                {/*<Toolbar />*/}
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;