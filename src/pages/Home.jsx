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

      <div className="banner ">
        <h1>Vire um profissional</h1>
      </div>

      <div className="container-home">

        <div className="perfil-card text-light">
          <img
            src="/img/foto.jpeg"
            alt="Jogador"
          />

          <h3>GUILHERME</h3>

          <p>Valorant</p>

          <button>Ver Mais</button>
        </div>

        <div className="video-card">
          <video width="100%" height="350" controls>
         <source src="/video/valorantvideo.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
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
            alt="Jogador"
          />
          <h3>LOUD</h3>
        </div>

        <div className="org-card">
          <img
            src="/img/furia.jpg"
            alt="Jogador"
          />
          <h3>FURIA</h3>
        </div>

        <div className="org-card">
          <img
            src="/img/mibr.jpg"
            alt="Jogador"
          />
          <h3>MIBR</h3>
        </div>

      </div>

    </div>
  );
}

export default Home;