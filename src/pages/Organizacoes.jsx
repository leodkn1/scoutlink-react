import { useEffect, useState } from "react";
import "../styles/organizacao.css";

function Organizacoes() {
  const [organizacoes, setOrganizacoes] = useState([]);

  useEffect(() => {
    async function carregarOrganizacoes() {
      try {
        const resposta = await fetch("/organizacoes.json");
        const dados = await resposta.json();
        setOrganizacoes(dados);
      } catch (erro) {
        console.error("Erro ao carregar organizações:", erro);
      }
    }

    carregarOrganizacoes();
  }, []);

  return (
    <main className="organizacoes-page">

      <section className="organizacoes-header">
        <h1>Organizações em Destaque</h1>

        <p>
          Conheça organizações e equipes que fazem parte do cenário
          competitivo de eSports.
        </p>
      </section>

      <section className="organizacoes-grid">

        {organizacoes.map((organizacao) => (
          <article
            className="organizacao-card"
            key={organizacao.id}
          >

            {/* LOGO */}
            <div className="organizacao-logo-container">

              <img
                src={organizacao.logo}
                alt={`Logo ${organizacao.nome}`}
                className="organizacao-logo"
              />

            </div>

            {/* CONTEÚDO */}
            <div className="organizacao-info">

              <span className="organizacao-label">
                ORGANIZAÇÃO
              </span>

              <h2>{organizacao.nome}</h2>

              <p className="organizacao-descricao">
                {organizacao.descricao}
              </p>

              {/* JOGOS */}
              <div className="organizacao-jogos">

                {organizacao.jogos.map((jogo, index) => (
                  <span key={index}>
                    {jogo}
                  </span>
                ))}

              </div>
            </div>

          </article>
        ))}

      </section>

    </main>
  );
}

export default Organizacoes;