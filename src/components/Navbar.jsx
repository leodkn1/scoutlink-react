import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

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

          <Link className="nav-link" to="/dashboard-talentos">
            Dashboard
          </Link>

          {user ? (
            <>
              <Link className="btn_perfil" to="/perfil">
                Meu Perfil
              </Link>

              <Link className="nav-link" to="/portfolio">
                Portfólio
              </Link>

              <button
                className="btn_sair"
                type="button"
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          ) : (
            <Link className="btn_perfil" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;