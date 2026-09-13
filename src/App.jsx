import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Talentos from "./pages/Talentos";
import Organizacoes from "./pages/Organizacoes";
import Jogos from "./pages/Jogos";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import DashboardTalentos from "./pages/DashboardTalentos";
import Perfil from "./pages/Perfil";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talentos" element={<Talentos />} />
        <Route
          path="/dashboard-talentos"
          element={<DashboardTalentos />}
        />
        <Route path="/organizacoes" element={<Organizacoes />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;