import { Box, Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import Carousel from "../comps/Carousel";
import Contact from "../comps/Contact";
import Navbar from "../comps/Navbar";
import "./Home.css";

export default function Home() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [rotateArrow, setRotateArrow] = useState(false);
  const questionsAndAnswers = [
    {question: "Do we get to know what food will be served?", answer: "Yes! This is the <a href='https://docs.google.com/document/d/1vMu8kWkczAraT2c1ubOncTpgNGMfGxvDaU9WEGfsGLc/edit?tab=t.0' target='_blank' rel='noopener noreferrer'>menu</a>!"},
    {question: "Can we bring non-stuy kids?", answer: "Yes!"},
    {question: "How much will tickets cost?", answer: "TBD but approximately $100 (hopefully a little bit under)."},
  ];
  const expandOnClick = (questionIndex) => {
    setExpandedQuestion(expandedQuestion === questionIndex ? null : questionIndex);
    setRotateArrow(!rotateArrow);
  };
  return (
    <Box>
    <Box className="navbar">
    <Navbar />
  </Box>  
    <Box className="home-page">
      <Box className="banner">
        <Typography className="banner-title">‼️TICKETS‼️</Typography>
        <Typography className="banner-text">Tickets are now available to buy! Click below to be redirected.</Typography>
        <Button className="banner-button" variant="contained" color="primary" size="large" style={{backgroundColor: '#444484  ',color: '#ffffff'}}  onClick={() => window.open('https://junior.stuysu.org/', '_blank')}>
          REDIRECT
        </Button>
      </Box>
      <Box className="info-page">
      <Typography className="info-title">JPROM</Typography>
      <Typography className="info-text">Junior Prom will be held on June 4th, 2025! Join us on the Spirit of New York at
         7:00 PM for an unforgettable evening of masks, food, and dancing! Attendees will board the boat at 5:30 PM. 
      </Typography>
        <Typography>&nbsp;</Typography>
        <Box className="slideshow">
          <Carousel className="slideshow-carousel" />
        </Box>
      </Box>
      <Box className="QNA">
          <Typography className="QNA-title">FAQs</Typography>
          {questionsAndAnswers.map((item, index) => (
            <Box key={index}>
              <Typography
                onClick={() => expandOnClick(index)}
                className={`QNA-question ${expandedQuestion === index ? "rotate-arrow" : ""}`}
              >
                {item.question}
              </Typography>
              <Collapse in={expandedQuestion === index}>
                <Typography className="QNA-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="footer">
            <Contact />
          </Box>
    </Box>
  );
}
