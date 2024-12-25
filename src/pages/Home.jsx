import Navbar from "../comps/Navbar";
import "./Home.css";
// import Contact from "../comps/Contact";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const magazineUrl =
    "https://www.instagram.com/p/DDK0lRat_K_/";

  const mobile = window.innerWidth <= 430;

  return (
    <Box className="home-page">
      <Box className="navbar">
        <Navbar />
      </Box>
      </Box>
    
  );
}
