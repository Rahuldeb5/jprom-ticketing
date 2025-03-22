import React from "react";
import "./Contact.css";
import { Box, Link, Typography } from "@mui/material";

const Contact = () => {
  return (
    <Box className="contact-box">
      <Box className="icons-container">
        <Box className="icons" align="center">
          <Link
            href="https://www.instagram.com/stuyjuniorcaucus/?hl=en"
            className="logo-ref"
            target="_blank"
          >
            <img src={"/images/instagram.png"} alt="Instagram logo" />
          </Link>
          <Link
            href="https://www.facebook.com/groups/stuyclass2026"
            className="logo-ref"
            target="_blank"
          >
            <img src={"/images/facebook.png"} alt="Facebook logo" />
          </Link>
          <Link
            href="https://linktr.ee/stuyjuniorcaucus24_25"
            className="logo-ref"
            target="_blank"
          >
            <img src={"/images/linktree.png"} alt="Linktree" />
          </Link>
          <Link
            href="https://github.com/Rahuldeb5/jprom-ticketing"
            className="logo-ref"
            target="_blank"
          >
            <img src={"/images/github.png"} alt="GitHub logo" />
          </Link>
        </Box>
      </Box>
      <Typography variant="body1" align="center">
        © 2025 Junior Caucus.
      </Typography>
      <Typography variant="body1" align="center" class="thanks">
        Special thanks to our Junior Caucus IT Team!
      </Typography>
    </Box>
  );
};

export default Contact;
