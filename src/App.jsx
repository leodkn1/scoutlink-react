import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Talentos from "./pages/Talentos";
import Organizacoes from "./pages/Organizacoes";
import Jogos from "./pages/Jogos";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {

  useEffect(() => {
    fetch("http://localhost:3000")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talentos" element={<Talentos />} />
        <Route path="/organizacoes" element={<Organizacoes />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
