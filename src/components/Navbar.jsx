import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
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
              <Link className="nav-link" to="/">Início</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/talentos">Talentos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/organizacoes">Organizações</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jogos">Jogos</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sobre">Sobre</Link>
            </li>

          </ul>

          
          {!user ? (
            <Link className="btn_perfil ms-lg-3 mt-3 mt-lg-0" to="/login">
              Login
            </Link>
          ) : (
            <div className="ms-lg-3 mt-3 mt-lg-0 d-flex align-items-center gap-2">
              <span className="text-light">
                {user.email}
              </span>

              <button className="btn_perfil" onClick={handleLogout}>
                Sair
              </button>
            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;