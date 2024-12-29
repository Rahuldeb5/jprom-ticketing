import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Ticket from "./pages/Ticket";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";



const App = () => {   
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/ticket" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
