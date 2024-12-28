import Navbar from "../comps/Navbar";
import "./Home.css";
import Carousel from "../comps/Carousel";
import { Box, Typography, Button, Collapse } from "@mui/material";
import React, { useState } from "react";

export default function Home() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [rotateArrow, setRotateArrow] = useState(false);
  const questionsAndAnswers = [
    {question: "Lorem ipsum dolor sit amet?", answer: "Lorem ipsum dolor sit amet."},
    {question: "Lorem ipsum dolor sit amet?", answer: "Lorem ipsum dolor sit amet"},
    {question: "Lorem ipsum dolor sit amet?", answer: "Lorem ipsum dolor sit amet."},
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
        <Button className="banner-button" variant="contained" color="primary" size="large" style={{backgroundColor: '#0e4187  ',color: '#ffffff'}}  onClick={() => window.open('https://www.pclassic.org/', '_blank')}>
          REDIRECT
        </Button>
      </Box>
      <Box className="info-page">
      <Typography className="info-title">JPROM</Typography>
      <Typography className="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        <Typography>&nbsp;</Typography>
        <Typography className='info-text' >EMAIL: jhuang60@stuy.edu</Typography>
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
                <Typography className="QNA-answer">{item.answer}</Typography>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
