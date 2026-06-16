import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand text-white fw-bold" to="/">
          ScoutLink
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuNavbar">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Início
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/talentos">
                Talentos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/organizacoes">
                Organizações
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jogos">
                Jogos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sobre">
                Sobre
              </Link>
            </li>

          </ul>

          <Link
            className="btn_perfil ms-lg-3 mt-3 mt-lg-0"
            to="/login"
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;