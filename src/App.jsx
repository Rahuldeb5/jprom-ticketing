import './App.css';
import { Box, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes, useSearchParams } from "react-router-dom";
import { supabase } from './supabaseClient';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const [searchParams] = useSearchParams();
  const [key, setKey] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async (key) => {
    const { data, error } = await supabase
      .from("users")
      .select("name, email")
      .eq("random_key", key);

    if(error) {
      console.log(error.message);
    }
    if(data && data.length > 0) {
      setUser(data[0]);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const keyFromParams = searchParams.get("key");
    if(keyFromParams !== key) {
      setKey(keyFromParams);
    }
  }, [searchParams, key]);

  useEffect(() => {
    if(key) {
      fetchUser(key);
    }
  }, [key]);
  
  return(
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
  );
};

const App = () => {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/ticket" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
