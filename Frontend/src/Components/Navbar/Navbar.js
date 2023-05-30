import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";

/* Author : Parul, Saifali */

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function handleLogout() {
    localStorage.clear();
  }
  return (
    <>
      <header className="header-container">
        <NavLink to="/feed">
          <img src="header.jpg" alt="header-logo" className="header-logo" />
        </NavLink>
        <nav
          role="navigation"
          className="navbar navbar-expand-lg"
          aria-label="shopping list navigation"
        >
          <IconButton
            className="icon-button"
            sx={{ display: { xs: "flex", sm: "flex", lg: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/feed" className="navigation-link">
                  <Typography variant="button">Feed</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/meal-planner" className="navigation-link">
                  <Typography variant="button">Planner</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/shoppingList" className="navigation-link">
                  <Typography variant="button">Shopping List</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profilepage" className="navigation-link">
                  <Typography variant="button">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}
              >
                <Link to="/" className="navigation-link">
                  <Typography variant="button">Logout</Typography>
                </Link>
              </MenuItem>
              <Notification />
            </Menu>
          </Box>
          <div className="collapse navbar-collapse main-navigation" id="navbar">
            <NavLink
              className={(navData) =>
                "navigation-link" + (navData.isActive ? " active" : "")
              }
              to="/feed"
            >
              Feed
            </NavLink>
            <NavLink
              className={(navData) =>
                "navigation-link" + (navData.isActive ? " active" : "")
              }
              to="/meal-planner"
            >
              Planner
            </NavLink>
            <NavLink
              className={(navData) =>
                "navigation-link" + (navData.isActive ? " active" : "")
              }
              to="/shoppingList"
            >
              Shopping List
            </NavLink>
            <NavLink
              className={(navData) =>
                "navigation-link" + (navData.isActive ? " active" : "")
              }
              to="/profilepage"
            >
              Profile
            </NavLink>

            <NavLink
              className={(navData) =>
                "navigation-link" + (navData.isActive ? " active" : "")
              }
              to="/"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
            <Notification />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
