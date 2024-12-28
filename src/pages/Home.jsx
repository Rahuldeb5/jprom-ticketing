import Navbar from "../comps/Navbar";
import "./Home.css";
// import Contact from "../comps/Contact";
import { Box, Typography, Button } from "@mui/material";

export default function Home() {

  return (
    <Box>
    <Box className="navbar">
    <Navbar />
  </Box>  
    <Box className="home-page">
      <Box className="banner">
        <Typography className="banner-title">‼️TICKETS‼️</Typography>
        <Typography className="banner-text">Tickets are now available to buy! Click below to be redirected.</Typography>
        <Button className="banner-button" variant="contained" color="primary" size="large" style={{backgroundColor: '#0e4187  ',color: '#ffffff'}}  onClick={() => window.open('https://www.pclassic.org/', '_blank')}>
          REDIRECT
        </Button>
      </Box>
      <Box className="info-page">
      <Typography className="info-title">JPROM</Typography>
      <Typography className="info-text">The Philadelphia Classic (PClassic) is Philadelphia's Premier Competitive Programming Competition held 
        at the University of Pennsylvania. We host events semesterly for high school students. Prizes and awards are given out to the top 
        scoring teams, and registration for the competition is free for all high schools. We will be allowing middle school students to participate in the
        competition as well!
        EMAIL: organizers@pclassic.org</Typography>
      </Box>
    </Box>
    </Box>
    
  );
}
