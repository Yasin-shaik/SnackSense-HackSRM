import React, { useState } from "react";
import axios from "../Api.js";
import { useNavigate } from "react-router-dom";
//import res from "../Assets/Images/res.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Box, Typography, TextField, FormControl, Select, MenuItem, Checkbox, FormControlLabel, Button, Paper, Stack } from "@mui/material";

const Details = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    dietType: [],
    allergies: [],
    activityLevel: "",
    waterIntake: "",
    sleepHours: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value),
    }));
  };

  const handleNavigate = () => {    navigate("/home");
  }

  const handleDetails = async () => {
    const email = props.user;
    if (!email) return console.log("Email not here");
    await axios.post("/user/userDetails", { userData, email });
    toast.success("You are now ready to scan");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <div style={{
      // backgroundImage: `url(${res})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Container maxWidth="sm" >
        <ToastContainer position="top-center" theme="light" />
        <Paper elevation={3} sx={{ p: 4, mt:"20%",  borderRadius: 3, backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.3)" }}>
          <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
            User Profile
          </Typography>
          <Stack spacing={2}>
            <TextField label="Age" type="number" name="age" fullWidth value={userData.age} onChange={handleChange} />
            <FormControl fullWidth>
              <fieldset>Gender</fieldset>
              <Select name="gender" value={userData.gender} onChange={handleChange}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Weight (kg)" type="number" name="weight" fullWidth value={userData.weight} onChange={handleChange} />
            <TextField label="Height (cm)" type="number" name="height" fullWidth value={userData.height} onChange={handleChange} />
            <Box>
              <Typography variant="h6">Diet Type</Typography>
              {["Vegetarian", "Vegan", "Keto", "Low-Carb", "High-Protein", "Mediterranean", "Paleo", "Gluten-Free", "Dairy-Free"].map((diet) => (
                <FormControlLabel key={diet} control={<Checkbox name="dietType" value={diet} onChange={handleCheckboxChange} />} label={diet} />
              ))}
            </Box>
            <Box>
              <Typography variant="h6">Allergies</Typography>
              {["Gluten", "Lactose/Dairy", "Nuts", "Soy", "Eggs", "Seafood", "Artificial Preservatives & Additives"].map((allergy) => (
                <FormControlLabel key={allergy} control={<Checkbox name="allergies" value={allergy} onChange={handleCheckboxChange} />} label={allergy} />
              ))}
            </Box>
            <FormControl fullWidth>
              <fieldset>Activity Level</fieldset>
              <Select name="activityLevel" value={userData.activityLevel} onChange={handleChange}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Sedentary">Sedentary</MenuItem>
                <MenuItem value="Light Activity">Light Activity</MenuItem>
                <MenuItem value="Moderate">Moderate</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Very Active">Very Active</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Daily Water Intake (ml)" type="number" name="waterIntake" fullWidth value={userData.waterIntake} onChange={handleChange} />
            <TextField label="Daily Sleep Hours" type="number" name="sleepHours" fullWidth value={userData.sleepHours} onChange={handleChange} />
            <Button variant="contained" color="success" fullWidth onClick={() => {handleDetails(); handleNavigate(); }}>
              Save Profile
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default Details;