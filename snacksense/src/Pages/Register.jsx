import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../Api.js";
import logi from "../Assets/Images/logi.jpg";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Register(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeat, setRepeat] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();

  const register = async () => {
    if (!name || !email || !password || !repeat) {
      toast.warning("Fill all the required fields");
      return;
    }
    if (password !== repeat) {
      toast.warning("Password & confirm password not matched");
      return;
    }
    if (password.length < 8) {
      toast.warning("Password should be more than 8 characters");
      return;
    }
    try {
      if (role === 'User') {
        props.setUser(email);
        await axios.post("/auth/registerUser", { name, email, password });
      } else {
        await axios.post("/auth/registerNutri", { name, email, password });
      }
      toast.success("Registration successful");
      props.setLogin(true);
      setTimeout(() => {
        navigate("/details");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <div className="form" style={{
      backgroundImage: `url(${logi})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <ToastContainer position="top-center" theme="light" />
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-90">
              <div className="card text-black" style={{
                borderRadius: "25px",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "20px"
              }}>
                <div className="card-body p-md-5">
                  <p className="text-center h1 fw-bold mb-5">Sign up</p>
                  <form>
                    <div className="mb-3">
                      <label>Signup as:
                        <select
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="form-control mt-1"
                        >
                          <option value="User">User</option>
                          <option value="Nutritionist">Nutritionist</option>
                        </select>
                      </label>
                    </div>
                    <div className="mb-3">
                      <input type="text" value={name} className="form-control" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <input type="email" value={email} className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <input type="password" value={password} className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <input type="password" value={repeat} className="form-control" placeholder="Repeat your password" onChange={(e) => setRepeat(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button onClick={register} type="button" className="btn btn-primary">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}