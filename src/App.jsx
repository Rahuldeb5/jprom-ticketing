import './App.css';
import Home from "./pages/Home";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { supabase } from './supabaseClient';
import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import Navbar from './comps/Navbar';


const UserPage = () => {
  const [key, setKey] = useState(null);
  const [user, setUser] = useState(null);

  const [buttonClicked, setButtonClicked] = useState(false);

  const [checked, setChecked] = useState(false);

  const videoRef = useRef(null);

  const fetchUser = async (key) => {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, check_in")
      .eq("random_key", key);

    if(error) {
      console.log(error.message);
    }
    if(data && data.length > 0) {
      setUser(data[0]);
      setChecked(data[0].check_in);
    } else {
      setUser(null);
    }
  };

  const readQRCode = async (video) => { 
    const reader = new BrowserQRCodeReader();

    try {
      const result = await reader.decodeOnceFromVideoDevice(null, video);
      const scannedText = result.getText();

      return scannedText;

    } catch(err) {
      console.error("Error scanning QR code:", err);
      return null;
    }
  }

  const scanningElement = async () => {
    const text = await readQRCode(videoRef.current);
    console.log(text);
    if(text) {
      setKey(text);
    } else {
      console.log("No valid link found");
    }
  }

  useEffect(() => {
    if(buttonClicked) {
      scanningElement();
      setButtonClicked(false);
    }
  }, [buttonClicked]);

  const handleClick = () => {
    setButtonClicked(true);
    setUser(null);
    setKey(null);
  }


  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    updateTable(newChecked);
    console.log(user.id);
    console.log(newChecked);
  }

  useEffect(() => {
    fetchUser(key);
  }, [key]);

  const updateTable = async (checked) => {
    const { error } = await supabase
      .from("users")
      .update({"check_in": checked})
      .eq('random_key', key);

    if(error) {
      console.log(error.message);
    }
  }
  
  return(
    <Box>
      <Box className="navbar">
        <Navbar />
      </Box>
      <Box>
        <Typography className="TITLE">JProm Ticket Page</Typography>
      </Box>
        <Box>
        {
        user ?
          (<Box className="nameEmail">
            <Typography>Name: {user.name}</Typography>
            <Typography>E-Mail: {user.email}</Typography>
          </Box>)
          :
          (<Box className="nameEmail">
            <Typography className='name'>Name: _____ </Typography>
            <Typography className='email'>E-Mail: _____ </Typography>
          </Box>)
      }
        </Box>
      <Box className="videoBox">
      <Box className="checkInBox">
        <Typography className='checkin'> Check in: </Typography>
      {
        user ?
          (<Checkbox 
            checked={checked} 
            onChange={handleCheck}  
          />)
          :
          (<></>)
      }
      </Box>
        <Button className = "scanButton" variant="contained" style={{backgroundColor: '#0e4187  ',color: '#ffffff',}} onClick={handleClick}>Scan QR Code </Button>
        <video className="camera" ref={videoRef}/>
      </Box>
      
      {/* 
        TO-DO: IMPLEMENT QR CODE SCANNER AND CHECK IN
      */}

    </Box>
  );
};

const App = () => {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/ticket" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
