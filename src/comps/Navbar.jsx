import { Box, Link } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import "./Navbar.css";

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
              href="/"
              className="nav-menu-item"
              style={{ fontSize: "2rem" }}
            >
              JProm Home
            </Link>
            <Link
              href="/cruise"
              className="nav-menu-item"
              style={{ fontSize: "2rem" }}
            >
              Cruise Route
            </Link>
          <Link
              href="/ticket"
              className="nav-menu-item"
              style={{ fontSize: "2rem" }}
            >
              Ticket Scan
            </Link>
            <Link
                href="https://junior.stuysu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-menu-item"
                style={{ fontSize: "2rem" }}
                >
                Junior Caucus Site
            </Link>
          </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
