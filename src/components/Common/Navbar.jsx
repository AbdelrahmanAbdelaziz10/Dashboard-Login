import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Notifications } from "@mui/icons-material";
import { useState } from "react";
import logo from "../../assets/logo.png";
import "../../Style/NavBar.css";
import { Container } from "react-bootstrap";
import profile from "../../assets/profile.png";
import { useSidebar } from "../Context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {

    const { userData, isAuthenticated, logout } = useAuth();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    // console.log("stored user data : ",storedUserData.displayname)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

//   const handleLogout = () => {
//   // 🗑️ امسح بيانات localStorage
//   localStorage.removeItem("userData");

//   // 🗑️ امسح الكوكيز اللي المتصفح شايفها (مش HttpOnly)
//   document.cookie.split(";").forEach((cookie) => {
//     const name = cookie.split("=")[0].trim();
//     document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//   });

//   // ✅ رجّع لصفحة login
//   navigate("/login", { replace: true });
// };
  const handleMenuAction = (action) => {
    if (action === "logout") {
      // handleLogout()
      logout();
      navigate("/login")

    }

    // Close menu
    handleMenuClose();
  };

  const menuItems = [
    { label: "Profile", action: "profile" },
    { label: "Settings", action: "settings" },
    { label: "Log Out", action: "logout" }, // ✅ fixed
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100vw",
        height: "8.5vh",
        minHeight: "4rem",
        backgroundColor: "#1565c0",
        color: "#fff",
        boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.1)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container fluid>
        <Toolbar
          sx={{
            minHeight: "100%",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Menu button + logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexGrow: 1,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleSidebar}
              aria-label="menu"
              sx={{ color: "#fff", padding: "0.5rem" }}
            >
              <MenuIcon sx={{ fontSize: "1.75rem" }} />
            </IconButton>

            <img
              src={logo}
              alt="Company Logo"
              style={{
                height: "50px",
                maxWidth: "50px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Right-side actions */}
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="notifications"
              sx={{ color: "#fff", padding: "0.5rem" }}
            >
              <Notifications sx={{ fontSize: "1.5rem" }} />
            </IconButton>

            <IconButton
              onClick={handleMenuOpen}
              color="inherit"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              aria-label="user menu"
              sx={{ color: "#000", padding: "0.25rem" }}
            >
              <img className="avatar-image" src={profile} alt="Profile" />
            </IconButton>

            <div className="avatar-div">
              <p>{storedUserData.displayname}</p>
            </div>

            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 0.125rem 0.5rem rgba(0,0,0,0.32))",
                  mt: "0.5rem",
                  "& .MuiAvatar-root": {
                    width: "2rem",
                    height: "2rem",
                    ml: "-0.25rem",
                    mr: "0.5rem",
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: "0.875rem",
                    width: "0.625rem",
                    height: "0.625rem",
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.action}
                  onClick={() => handleMenuAction(item.action)}
                  sx={{
                    color: "#000",
                    fontSize: "0.875rem",
                    padding: "0.5rem 1rem",
                    minHeight: "auto",
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
