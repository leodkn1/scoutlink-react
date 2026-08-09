import { useNavigate } from "react-router-dom";
import "../styles/home.css";



function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">


      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            SCOUTLINK • ESPORTS
          </span>

          <h1>
            Conectando talentos aos
            <strong> grandes palcos do eSports.</strong>
          </h1>

          <p>
            Encontre jogadores, organizações e oportunidades
            para transformar sua paixão por games em carreira.
          </p>

          <div className="hero-buttons">

            <button
              className="btn-primary"
              onClick={() => navigate("/talentos")}
            >
              Encontrar talentos
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Sou jogador
            </button>

          </div>

        </div>

        <div className="hero-logo">

          <img
            src="/img/SCOUTLINK.png"
            alt="ScoutLink"
          />

        </div>

      </section>



      <section className="home-intro">

        <span>COMO FUNCIONA</span>

        <h2>
          Tudo o que você precisa para entrar no cenário competitivo.
        </h2>

        <p>
          O ScoutLink aproxima jogadores, talentos e organizações,
          facilitando a descoberta de novas oportunidades no mundo
          dos eSports.
        </p>

      </section>



      <section className="home-cards">

        <article className="home-card">

          <div className="card-icon">
            🎮
          </div>

          <h3>
            Encontre talentos
          </h3>

          <p>
            Descubra jogadores de diferentes jogos,
            ranks e estilos de gameplay.
          </p>

          <button onClick={() => navigate("/talentos")}>
            Ver talentos →
          </button>

        </article>


        <article className="home-card">

          <div className="card-icon">
            🏆
          </div>

          <h3>
            Conheça organizações
          </h3>

          <p>
            Explore organizações e equipes que fazem
            parte do cenário competitivo.
          </p>

          <button onClick={() => navigate("/organizacoes")}>
            Ver organizações →
          </button>

        </article>


        <article className="home-card">

          <div className="card-icon">
            ⚡
          </div>

          <h3>
            Explore oportunidades
          </h3>

          <p>
            Encontre novas possibilidades para evoluir
            e construir sua carreira nos eSports.
          </p>

          <button onClick={() => navigate("/jogos")} >
            Explorar →
          </button>

        </article>

      </section>



      <section className="home-cta">

        <h2>
          Pronto para dar o próximo passo?
        </h2>

        <p>
          Entre para o ScoutLink e encontre seu espaço
          no cenário competitivo.
        </p>

        <button onClick={() => navigate("/talentos")}>
          Começar agora →
        </button>

      </section>

    </main>
  );
}

export default Home;