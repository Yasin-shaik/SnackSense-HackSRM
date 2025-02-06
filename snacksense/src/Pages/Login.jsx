import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import logi from "../Assets/Images/logi.jpg";
import api from "../Api.js";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  Link,
} from "@mui/material";

export default function Login(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [email, setEmail] = useState("");

  const login = async () => {
    if (!email || !password) {
      toast.warning("Enter all the fields required");
      return;
    }
    if (password.length < 3) {
      toast.error("Password too short");
      return;
    }
    try {
      if (role === "User") {
        await api.post("/auth/loginUser", { email, password });
      } else {
        await api.post("/auth/loginNutri", { email, password });
      }
      toast.success("Login successful");
      props.setLogin(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${logi})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <ToastContainer position="top-center" theme="light" />
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "100%",
          }}
        >
          <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold" color="#313c03">
            Login
          </Typography>
          <FormControl fullWidth margin="normal">
            <fieldset sx={{ color: "#313c03" }}>Login as</fieldset>
            <Select value={role} onChange={(e) => setRole(e.target.value)} sx={{ color: "#313c03" }}>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Nutritionist">Nutritionist</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Email" value={email} margin="normal" onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" value={password} margin="normal" onChange={(e) => setPassword(e.target.value)} />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Link
              onClick={() => navigate("/forgot-password")}
              sx={{ cursor: "pointer", fontWeight: "bold", color: "#1565c0" }}
            >
              Forgot Password?
            </Link>
          </Box>
          <Button fullWidth variant="contained" sx={{ mt: 3, fontWeight: "bold", backgroundColor: "#313c03", color: "white" }} onClick={login}>
            Login
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="#313c03">
              Don't have an account?{" "}
              <Link onClick={() => navigate("/register")} sx={{ cursor: "pointer", fontWeight: "bold", color: "#1565c0" }}>
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}