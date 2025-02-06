import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/Images/logo.png";

export default function Navbar({ scrollToFeatureSteps, login }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if the user is authenticated (example: checking local storage or a state)
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleHomeNavigation = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isScrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)",
        boxShadow: "none",
        backdropFilter: isScrolled ? "blur(5px)" : "none",
        padding: "8px 0",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo Image */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to='/home'><img src={logo} alt="Logo" style={{ height: "60px", width: "auto" }} /></Link>
        </Box>

        {/* Centered Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            onClick={handleHomeNavigation}
            sx={{
              color: isScrolled ? "black" : "white",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => scrollToSection("features-section")}
            sx={{
              color: isScrolled ? "black" : "white",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",
            }}
          >
            How it works
          </Button>
          <Button
           onClick={() => scrollToSection("why-choose")}
            sx={{
              color: isScrolled ? "black" : "white",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s ease",
            }}
          >
            Features
          </Button>
        </Box>

        {/* Login/Logout Button */}
        {isAuthenticated ? (
  <Button
    onClick={() => {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      navigate("/login");
    }}
    sx={{
      background: "black",
      color: "white",
      borderRadius: "20px",
      padding: "6px 20px",
      fontWeight: "500",
      textTransform: "none",
      "&:hover": { background: "#333" },
    }}
  >
    Logout
  </Button>
) : (
  <Button
    component={Link}
    to="/nutritionists"
    sx={{
      background: "black",
      color: "white",
      borderRadius: "20px",
      padding: "6px 20px",
      fontWeight: "500",
      textTransform: "none",
      "&:hover": { background: "#333" },
    }}
  >
    {login ? "Connect to a Nutritionist" : "Join Us!"}
  </Button>
)}

      </Toolbar>
    </AppBar>
  );
}