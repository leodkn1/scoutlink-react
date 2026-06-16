import { useState } from "react";
import "../styles/home.css";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    
    <div className="home">

      <div className="home-topo">
        <p className="frase">
          Conectando jogadores ao cenário profissional de eSports.
        </p>

        <div className="cadastro-box">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn-cadastrar"
            onClick={handleRegister}
          >
            Cadastrar
          </button>
        </div>
      </div>

      <div className="banner">
        <h1>Vire um profissional</h1>
      </div>

      <div className="container-home">

        <div className="perfil-card">
          <img
            src="/img/foto.jpeg"
            alt="Guilherme"
          />

          <h3>GUILHERME</h3>

          <p>Valorant</p>

          <button>Ver Mais</button>
        </div>

        <div className="video-card">
          <video controls>
            <source
              src="/video/valorantvideo.mp4"
              type="video/mp4"
            />
          </video>
        </div>

      </div>

      <h2 className="titulo-org">
        ORGANIZAÇÕES EM DESTAQUE
      </h2>

      <div className="organizacoes">

        <div className="org-card">
          <img
            src="/img/loud.png"
            alt="LOUD"
          />
          <h3>LOUD</h3>
        </div>

        <div className="org-card">
          <img
            src="/img/furia.jpg"
            alt="FURIA"
          />
          <h3>FURIA</h3>
        </div>

        <div className="org-card">
          <img
            src="/img/mibr.jpg"
            alt="MIBR"
          />
          <h3>MIBR</h3>
        </div>

      </div>

    </div>
  );
}

export default Home;