import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ScanQR from "./Pages/ScanQR";
import Results from "./Pages/Results";
import Details from "./Pages/Details";
import Nutritionists from './Pages/Nutritionists';
import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [login,setLogin]=useState(false);

  return (
    <BrowserRouter>
      <Layout login={login}>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/hero" element={<Hero />} />
          <Route
            exact
            path="/register"
            element={<Register setUser={setUser} setLogin={setLogin} />}
          />
          <Route exact path="/login" element={<Login product={product} setLogin={setLogin} />} />
          <Route
            exact
            path="/scanQR"
            element={<ScanQR setProduct={setProduct} />}
          />
          <Route
            exact
            path="/results"
            element={<Results product={product} />}
          />
          <Route exact path="/details" element={<Details user={user} />} />
          <Route exact path="/nutritionists" element={<Nutritionists />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function Layout({ children, login }) {
  const location = useLocation();
  const noNavbarFooterPages = ["/login", "/register"];
  const hideNavbarFooter = noNavbarFooterPages.includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar login={login} />}
      {children}
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
