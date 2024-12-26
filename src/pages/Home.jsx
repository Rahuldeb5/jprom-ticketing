import Navbar from "../comps/Navbar";
import "./Home.css";
// import Contact from "../comps/Contact";
import { Box, Typography } from "@mui/material";

export default function Home() {

  return (
    <Box className="home-page">
      <Box className="navbar">
        <Navbar />
      </Box>
      <Box>
          <Typography className="TITLE">JProm Ticket Page</Typography>
      </Box>
    </Box>
    
  );
}
