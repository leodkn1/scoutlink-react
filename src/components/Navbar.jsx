import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-zinc-900 border-b-2 border-red-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          to="/"
          className="text-white text-3xl font-bold"
        >
          ScoutLink
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/" className="text-white hover:text-red-500">
            Início
          </Link>

          <Link to="/talentos" className="text-white hover:text-red-500">
            Talentos
          </Link>

          <Link to="/organizacoes" className="text-white hover:text-red-500">
            Organizações
          </Link>

          <Link to="/jogos" className="text-white hover:text-red-500">
            Jogos
          </Link>

          <Link to="/sobre" className="text-white hover:text-red-500">
            Sobre
          </Link>

          <Link
            to="/login"
            className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;