import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Grid,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import { keyframes } from "@emotion/react";
import logo from "../Assets/Images/logo.png"
// Animation for fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const nutritionists = [
  { name: "Dr. Sarah Johnson", specialization: "Sports Nutrition", experience: "10 years", email: "sarah@example.com", image: `${logo}`, details: "Dr. Sarah is an expert in sports nutrition, helping athletes achieve peak performance through proper diet and supplements." },
  { name: "Dr. Mark Smith", specialization: "Clinical Nutrition", experience: "8 years", email: "mark@example.com", image: `${logo}`, details: "Dr. Mark specializes in clinical nutrition, focusing on personalized meal plans for patients with medical conditions." },
  { name: "Dr. Emily Davis", specialization: "Weight Management", experience: "12 years", email: "emily@example.com", image: `${logo}`, details: "Dr. Emily helps clients achieve their weight goals with sustainable diet and exercise plans." },
  { name: "Dr. Laura Thompson", specialization: "Dietary Consultation", experience: "9 years", email: "laura@example.com", image: `${logo}`, details: "Dr. Laura focuses on dietary consultation to create balanced nutrition plans based on individual health goals." },
  { name: "Dr. James Brown", specialization: "Pediatric Nutrition", experience: "7 years", email: "james@example.com", image: `${logo}`, details: "Dr. James specializes in pediatric nutrition, offering dietary plans for children with health conditions." },
  { name: "Dr. Olivia Williams", specialization: "Vegan Nutrition", experience: "6 years", email: "olivia@example.com", image: `${logo}`, details: "Dr. Olivia is an expert in vegan nutrition, helping individuals transition to plant-based diets while maintaining nutritional balance." },
];

function NutritionistsList() {
  const [open, setOpen] = useState(false);
  const [selectedNutritionist, setSelectedNutritionist] = useState(null);

  const handleClickOpen = (nutritionist) => {
    setSelectedNutritionist(nutritionist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedNutritionist(null);
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 5, mt: "5%" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#00796b", mb: 4 }}>
        🥗 Meet Our Expert Nutritionists 🍏
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ animation: `${fadeIn} 1s ease-out` }}>
        {nutritionists.map((nutritionist, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ transition: "transform 0.3s", '&:hover': { transform: "scale(1.05)" }, cursor: "pointer" }} onClick={() => handleClickOpen(nutritionist)}>
              <CardMedia component="img" height="200" image={nutritionist.image} alt={nutritionist.name} />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#00796b" }}>{nutritionist.name}</Typography>
                <Typography variant="body1" color="text.secondary">{nutritionist.specialization}</Typography>
                <Typography variant="body2" color="text.secondary">Experience: {nutritionist.experience}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: "90%", maxWidth: "500px", p: 3 } }}>
        {selectedNutritionist && (
          <>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#00796b" }}>{selectedNutritionist.name}</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img src={selectedNutritionist.image} alt={selectedNutritionist.name} style={{ borderRadius: "50%", marginBottom: 20, width: 120, height: 120 }} />
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#00796b" }}>Specialization: {selectedNutritionist.specialization}</Typography>
                <Typography variant="body1">Experience: {selectedNutritionist.experience}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>{selectedNutritionist.details}</Typography>
                <Box display="flex" justifyContent="center" gap={2} mt={3}>
                  <Button variant="contained" color="primary" startIcon={<EmailIcon />} onClick={() => window.location.href = `mailto:${selectedNutritionist.email}`}>Email</Button>
                  <Button variant="outlined" startIcon={<InfoIcon />} onClick={handleClose} sx={{ borderColor: "#00796b", color: "#00796b" }}>Close</Button>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default NutritionistsList;
