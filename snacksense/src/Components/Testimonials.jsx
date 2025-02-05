import React from "react";
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";

const testimonials = [
  {
    id: 1,
    text: "Finally, an app that helps me eat better! Love the AI health score.",
    author: "Ajay, Fitness Enthusiast",
  },
  {
    id: 2,
    text: "Great app! It makes tracking my meals effortless.",
    author: ", Nutritionist",
  },
  {
    id: 3,
    text: "A must-have for healthy eating! Highly recommend.",
    author: "John, Health Coach",
  },
];

export default function Testimonials() {
  return (
    <Box sx={styles.testimonialSection}>
      <Typography variant="h4" sx={styles.title}>
        What Our Users Say
      </Typography>

      <Box sx={styles.cardsContainer}>
        {testimonials.map((item) => (
          <Card key={item.id} sx={styles.card}>
            <Avatar sx={styles.avatar}>{item.author[0]}</Avatar>
            <CardContent sx={styles.cardContent}>
              <Typography variant="body1" sx={styles.text}>
                "{item.text}"
              </Typography>
              <Typography variant="body2" sx={styles.author}>
                - {item.author}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

const styles = {
  testimonialSection: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fafafa",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "40px",
    letterSpacing: "1px",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  card: {
    backgroundColor: "#a36818",
    color: "white", // Ensuring text inside card is white
    padding: "30px",
    borderRadius: "15px",
    maxWidth: "300px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    },
  },
  avatar: {
    width: "60px",
    height: "60px",
    backgroundColor: "#ff9800",
    color: "#fff",
    fontSize: "1.5rem",
    margin: "0 auto 20px",
  },
  cardContent: {
    padding: "10px 0",
  },
  text: {
    fontStyle: "italic",
    color: "white", // White text inside card
    fontSize: "1rem",
  },
  author: {
    fontWeight: "500",
    marginTop: "15px",
    color: "white", // White author text
  },
};
