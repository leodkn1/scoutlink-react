import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-dark">

      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          ScoutLink
        </Link>

        <div className="d-flex align-items-center gap-3">

          <Link className="nav-link" to="/">
            Início
          </Link>

          <Link className="nav-link" to="/talentos">
            Talentos
          </Link>

          <Link className="nav-link" to="/organizacoes">
            Organizações
          </Link>

          <Link className="nav-link" to="/jogos">
            Jogos
          </Link>

          <Link className="nav-link" to="/sobre">
            Sobre
          </Link>

          <Link className="btn_perfil" to="/login">
            Login
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;