import './App.css';
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { supabase } from './supabaseClient';
import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/browser';
import Navbar from './comps/Navbar';

const HomePage = () => {
  
  return(
    <Box className="navbar">
      <Navbar />
    </Box>
  );
}

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
      <Box paddingTop={"10em"}>
        <Typography>JProm Ticket Page</Typography>
        <Box>
        {
        user ?
          (<Box>
            <Typography>{user.name}</Typography>
            <Typography>{user.email}</Typography>
          </Box>)
          :
          (<Box>
            <Typography>No data found</Typography>
          </Box>)
      }
        </Box>
      </Box>
      <Box>
        <video ref={videoRef} style={{ width: "25%" }} />
        <Button variant="contained" onClick={handleClick}>Scan QR Code </Button>
      </Box>
      
      {/* 
        TO-DO: IMPLEMENT QR CODE SCANNER AND CHECK IN
      */}
      <Box>
        <Typography> Check in: </Typography>
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
    </Box>
  );
};

const App = () => {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/ticket" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
