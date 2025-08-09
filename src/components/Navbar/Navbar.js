import React, { useState, useEffect } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./styles.css";

import memories from "../../images/memories.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      className="appbar"
      position="static"
      color="inherit"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 2rem",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box className="logo-box" component={Link} to="/">
        <img
          src={memories}
          alt="icon"
          height="50"
          style={{ borderRadius: "50%" }}
        />
        <Typography variant="h2" className="logo-text">
          Memories
        </Typography>
      </Box>
      {/* iske baad me signin and logout ka fxn hai */}

      <Toolbar className="user-info" sx={{ padding: "0 !important" }}>
        {user?.result ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Avatar
              className="user-avatar"
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className="user-name" variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              className="logout-button"
              variant="contained"
              color="error"
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            signin-button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
