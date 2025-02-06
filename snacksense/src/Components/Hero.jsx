import React from "react";
import woman from "../Assets/Images/woman.jpg";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
} from "@mui/material";

export default function Hero() {
  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${woman})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 5%",
          textAlign: "right",
        }}
      >
        <Box sx={{ maxWidth: "50%" }}>
          <Typography variant="h3" fontWeight="bold">
            Scan. Analyze. Eat Smart!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            AI-powered food insights at your fingertips. Make healthier choices
            with real-time ingredient analysis!
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button
              component={Link}
              to="/register"
              sx={{
                background: "#5A9C58",
                color: "white",
                borderRadius: "20px",
                padding: "10px 25px",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": { background: "#4C874B" },
              }}
            >
              Sign Up
            </Button>
            <Button
              component={Link}
              to="/login"
              sx={{
                background: "#97723E",
                color: "white",
                borderRadius: "20px",
                padding: "10px 25px",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": { background: "#7F5F32" },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Feature Steps Section */}
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          mt: -12,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {[
          {
            step: "Step 1",
            title: "Sign In & Scan",
            description:
              "Log in and scan any snack's barcode to retrieve its health details!",
            bgColor: "#38450e",
          },
          {
            step: "Step 2",
            title: "Get Instant Insights",
            description:
              "Our AI breaks down nutrition, ingredients, allergens & sustainability scores!",
            bgColor: "#97723E",
          },
          {
            step: "Step 3",
            title: "Make Smarter Choices",
            description:
              "Receive AI-powered recommendations for healthier alternatives!",
            bgColor: "#38450e",
          },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: item.bgColor,
              background: `rgba(${parseInt(
                item.bgColor.slice(1, 3),
                16
              )}, ${parseInt(item.bgColor.slice(3, 5), 16)}, ${parseInt(
                item.bgColor.slice(5, 7),
                16
              )}, 0.9)`, // Increased transparency
              textAlign: "center",
              borderRadius: "12px",
              boxShadow: 3,
              padding: "20px",
              color: "white",
              flex: "1 1 calc(33.333% - 20px)",
              minWidth: "280px",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {item.step}
              </Typography>
              <Typography variant="subtitle1" fontWeight="500">
                {item.title}
              </Typography>
              <Typography>{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Signup Button (Properly Positioned Below Cards) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Button
          component={Link}
          to="/register"
          sx={{
            background: "#a36818",
            color: "white",
            borderRadius: "20px",
            padding: "12px 30px",
            fontWeight: "500",
            textTransform: "none",
            "&:hover": { background: "#A46E2F" },
          }}
        >
          Signup & Start Scanning
        </Button>
      </Box>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 1 }}
      >
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px",
            background: "#EEF1E6",
          }}
          elevation={3}
        >
          {/* Left Section - Title */}
          <Box id="why-choose" sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#3D522D" }}
            >
              Why Choose <br /> SnakSense?
            </Typography>
          </Box>

          {/* Right Section - Features */}
          <Box
            id="why-choose"
            sx={{
              flex: 2,
              background: "#a36818",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {[
              {
                title: "Instant Barcode Scanning",
                description: "Scan a snack & get real-time health insights!",
              },
              {
                title: "AI-Powered Health Score",
                description:
                  "A smart rating from 0-100 based on ingredients & nutrition!",
              },
              {
                title: "Ingredient Classification",
                description:
                  "Find out which ingredients are beneficial, neutral, or harmful.",
              },
              {
                title: "Personalized Diet Insights",
                description:
                  "Scan a snack & get real-time Vegan, Keto, or Gluten-Free recommendations!",
              },
              {
                title: "Allergen Alerts",
                description:
                  "Set allergens, and get warnings for unsafe snacks!",
              },
              {
                title: "Eco-Friendly Rating",
                description: "Know how sustainable your food choices are!",
              },
            ].map((item, index) => (
              <Box key={index} sx={{ width: "48%", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  ▶ {item.title}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
