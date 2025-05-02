import Navbar from "../comps/Navbar";
import Contact from "../comps/Contact";
import "./Home.css";
import Carousel from "../comps/Carousel";
import { Box, Typography, Button, Collapse, Link } from "@mui/material";
import React, { useState } from "react";

export default function Home() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [rotateArrow, setRotateArrow] = useState(false);
  const questionsAndAnswers = [
    {question: "Do we get to know what food will be served?", answer: (
      <React.Fragment>
        Yes! This is the <Link href="https://docs.google.com/document/d/1vMu8kWkczAraT2c1ubOncTpgNGMfGxvDaU9WEGfsGLc/edit?tab=t.0" target="_blank" rel="noopener" className="faq-link">menu</Link>.
      </React.Fragment>
    )},
    {question: "Can we bring non stuy kids?", answer: "Yes!"}
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
        <Button className="banner-button" variant="contained" color="primary" size="large" style={{backgroundColor: '#444484  ',color: '#ffffff'}}  onClick={() => window.open('https://stuy.enschool.org/apps/forms2/?f=51058', '_blank')}>
          REDIRECT
        </Button>
      </Box>
      <Box className="info-page">
      <Typography className="info-title">JPROM</Typography>
      <Typography className="info-text">Junior Prom will be on Wednesday, June 4, 2025 on the Spirit of New York 🛳 and the theme is Masquerade Ball 🌟. (no school the next day :)
      </Typography>
      <Typography className="info-text">The Early Bird  Special 🕊price is $95 until 5/4 or when it reaches capacity at 125 tickets-whatever comes first! 
Note: The discounted tickets are limited to one per person and only available to Stuyvesant students.
Afterwards, tickets will be sold at the regular price of $105. Get them now before it's too late!!!
      </Typography>
        <Typography>&nbsp;</Typography>
        <Link className='link-text' href="https://docs.google.com/document/d/1EM-nl0JzDp3wK_h-PP-D48TUCXTCx3Qd6nrvAc4tUgY/edit?tab=t.0">Cruise Route</Link>
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
      <Box className="footer">
            <Contact />
          </Box>
    </Box>
  );
}
