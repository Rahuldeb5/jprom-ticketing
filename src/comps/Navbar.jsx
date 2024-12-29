import React from "react";
import "./Navbar.css";
import { useState, useEffect, useCallback } from "react";
import { Box, Link } from "@mui/material";

const Navbar = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        if (!menuOpen) {
          toggleMenu();
        }
      } else {
        if (menuOpen) {
          toggleMenu();
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen, toggleMenu]);

  return (
    <Box className="head-nav">
      <Box className="nav-container">
        <Box className="logo-container" sx={{ width: "20%" }}>
          <Link href="/">
            <img
              src="/images/JuniorCaucus.png"
              alt="Logo"
              className="junior-logo nav-menu-item"
            />
          </Link>
        </Box>
          <Box className="menu">
            <Link
              href="/ticket"
              className="nav-menu-item"
              style={{ fontSize: "2rem" }}
            >
              Ticket Scan
            </Link>
          </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
