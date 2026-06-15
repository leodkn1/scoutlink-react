import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Talentos from "./pages/Talentos";
import Organizacoes from "./pages/Organizacoes";
import Jogos from "./pages/Jogos";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";

function App() {
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
    </BrowserRouter>
  );
}

export default App;