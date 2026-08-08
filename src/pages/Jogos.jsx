import { useEffect, useState } from "react";
import "../styles/jogos.css";

function Jogos() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      try {
        const resposta = await fetch("/jogos.json");
        const dados = await resposta.json();
        setJogos(dados);
      } catch (erro) {
        console.error("Erro ao carregar jogos:", erro);
      }
    }

    carregarJogos();
  }, []);

  return (
    <main className="jogos-page">

      <section className="jogos-header">
        <span>SCOUTLINK</span>

        <h1>Jogos em Destaque</h1>

        <p>
          Explore os principais jogos do cenário competitivo
          e encontre talentos e organizações.
        </p>
      </section>

      <section className="jogos-grid">

        {jogos.map((jogo) => (
          <article className="jogo-card" key={jogo.id}>

            <div className="jogo-imagem">
              <img
                src={jogo.imagem}
                alt={jogo.nome}
              />

              <div className="jogo-overlay">
                <span>ESPORTS</span>
              </div>
            </div>

            <div className="jogo-info">

              <h2>{jogo.nome}</h2>

              <p>
                {jogo.descricao}
              </p>

              <div className="jogo-detalhes">

                <div>
                  <span>GÊNERO</span>
                  <strong>{jogo.genero}</strong>
                </div>

                <div>
                  <span>PLATAFORMA</span>
                  <strong>{jogo.plataforma}</strong>
                </div>

              </div>

            </div>

          </article>
        ))}

      </section>

    </main>
  );
}

export default Jogos;