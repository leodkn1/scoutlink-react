import "../styles/home.css";

function Home() {
  return (
    <div>

      <div className="home-topo">
        <p className="frase">
          Conectando jogadores ao cenário profissional de eSports.
        </p>

        <button className="btn-cadastrar">
          Cadastrar
        </button>
      </div>

      <div className="banner">
        <h1>Vire um profissional</h1>
      </div>

      <div className="container-home">

        <div className="perfil-card">
          <img
            src="../img/foto.jpg"
            alt="Jogador"
          />

          <h3>GUILHERME</h3>

          <p>Valorant</p>

          <button>Ver Mais</button>
        </div>

        <div className="video-card">
          <iframe
            width="100%"
            height="350"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Vídeo"
          ></iframe>
        </div>

      </div>

      <h2 className="titulo-org">
        ORGANIZAÇÕES EM DESTAQUE
      </h2>

      <div className="organizacoes">

        <div className="org-card">
          <h3>LOUD</h3>
        </div>

        <div className="org-card">
          <h3>FURIA</h3>
        </div>

        <div className="org-card">
          <h3>MIBR</h3>
        </div>

      </div>

    </div>
  );
}

export default Home;