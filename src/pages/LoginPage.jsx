import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Box, Button, Typography } from "@mui/material";
import Ticket from "./Ticket";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import Navbar from "../comps/Navbar";
import "./LoginPage.css"

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    const navigate = useNavigate();

    const handleSignIn = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/ticket`,
            },

        });

        if(error) console.error(error.message);
        setLoading(false);
    };

    const checkAccess = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Error fetching session:", error.message);
            return;
        }

        const session = data.session;

        if(session && session.user) {
            const email = session.user.email;
            setUserEmail(email);
            console.log(userEmail);
            navigate("/ticket");
        } else {
            console.log("No active session or user is undefined.");
        }
    };

    useEffect(() => {
        checkAccess();
    }, []);

    return(
        <Box>
            {userEmail ? (
                <Box>
                    <Ticket />
                </Box>
            ) : (
                <Box>
                <Box className="navbar">
                <Navbar />
                </Box>
                <Box className="login-page">
                    <Box>
                        <Box className="login-container">
                        <Box className="login-left">
                        <img class="image" src="../images/wtc.png" alt="world trade center" />

                        </Box>
                        <Box className="login-right"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "50vh", 
                            }}>
                            <Typography className="login-title">
                                Login with an authorized account to access ticketing page!
                            </Typography>
                            <Box className="loginButton"
                            sx ={{
                                paddingTop: "5vh",
                            }}>
                                <Button 
                                    onClick={handleSignIn} 
                                    disabled={loading}
                                    variant="contained"
                                    color="primary"
                                    style={{backgroundColor: '#444484  ',color: '#ffffff'}}
                                    startIcon={<GoogleIcon />}
                                >
                                    {loading ? 'Loading...' : 'Sign in with Google'}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                </Box>
                </Box>

            )}
        </Box>
    );
}

export default LoginPage;
