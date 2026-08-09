import { useEffect, useState } from "react";
import "../styles/sobre.css";

function Sobre() {
  const [equipe, setEquipe] = useState([]);

  useEffect(() => {
    fetch("/Sobre.json")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setEquipe(dados);
      })
      .catch((erro) => {
        console.error("Erro ao carregar Sobre.json:", erro);
      });
  }, []);

  return (
    <main className="sobre-page">

      <section className="sobre-hero">
        <span className="sobre-tag">
          SOBRE O PROJETO
        </span>

        <h1>
          Conheça o <strong>ScoutLink</strong>
        </h1>

        <p>
          O ScoutLink é uma plataforma desenvolvida para aproximar
          jogadores, talentos e organizações do cenário competitivo
          de eSports.
        </p>
      </section>


      <section className="sobre-objetivo">

        <div className="objetivo-texto">

          <span>O QUE É O SCOUTLINK?</span>

          <h2>
            Transformando paixão por games em oportunidades.
          </h2>

          <p>
            O ScoutLink foi criado com o objetivo de facilitar a
            descoberta de novos talentos no cenário de eSports.
          </p>

          <p>
            A plataforma permite que jogadores apresentem suas
            habilidades e que organizações encontrem novos talentos
            para suas equipes.
          </p>

        </div>

        <div className="objetivo-destaque">

          <div>
            <strong>01</strong>
            <span>Talentos</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Organizações</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Oportunidades</span>
          </div>

        </div>

      </section>


      <section className="equipe">

        <div className="equipe-header">

          <span>NOSSA EQUIPE</span>

          <h2>
            Quem está por trás do ScoutLink?
          </h2>

          <p>
            Conheça os integrantes responsáveis pelo desenvolvimento
            do projeto.
          </p>

        </div>


        <div className="equipe-grid">

          {equipe.map((membro) => (
            <article
              className="membro-card"
              key={membro.id}
            >

              <div className="membro-foto-3d">

                <img
                  src={membro.foto}
                  alt={membro.nome}
                />

              </div>

              <div className="membro-info">

                <span>
                  INTEGRANTE {String(membro.id).padStart(2, "0")}
                </span>

                <h3>
                  {membro.nome}
                </h3>

                <p>
                   {membro.rm}
                </p>

              </div>

            </article>
          ))}

        </div>

      </section>


      <section className="sobre-missao">

        <span>NOSSA MISSÃO</span>

        <h2>
          Conectar pessoas e oportunidades através dos eSports.
        </h2>

        <p>
          Acreditamos que todo jogador possui potencial para evoluir
          e encontrar seu espaço no cenário competitivo.
        </p>

      </section>

    </main>
  );
}

export default Sobre;