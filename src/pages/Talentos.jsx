import { useEffect, useState } from "react";
import "../styles/Talento.css";

function Talentos() {
  const [talentos, setTalentos] = useState([]);

  useEffect(() => {
    async function carregarTalentos() {
      try {
        const resposta = await fetch("/talentos.json");
        const dados = await resposta.json();
        setTalentos(dados);
      } catch (erro) {
        console.error("Erro ao carregar talentos:", erro);
      }
    }

    carregarTalentos();
  }, []);

  return (
    <main className="talentos-page">

      <section className="talentos-header">
        <h1>Talentos em Destaque</h1>
        <p>
          Descubra jogadores prontos para alcançar o próximo nível.
        </p>
      </section>

      <section className="talentos-lista">

        {talentos.map((talento) => (
          <article className="talento-card" key={talento.id}>

            
            <div className="talento-foto-container">
              <img
                src={talento.foto}
                alt={`Foto de ${talento.nome}`}
                className="talento-foto"
              />
            </div>

            
            <div className="talento-info">

              <div className="talento-topo">
                <div>
                  <span className="talento-label">
                    JOGADOR
                  </span>

                  <h2>{talento.nome}</h2>
                </div>

                <span className="talento-rank">
                  {talento.rank}
                </span>
              </div>

              <div className="talento-dados">

                <div>
                  <span>JOGO</span>
                  <strong>{talento.jogo}</strong>
                </div>

                <div>
                  <span>RANK</span>
                  <strong>{talento.rank}</strong>
                </div>

              </div>

              
              <div className="gameplay">

                <div className="gameplay-header">
                  <span>GAMEPLAY</span>
                </div>

                {talento.gameplay ? (
                  <video
                    src={talento.gameplay}
                    controls
                  />
                ) : (
                  <div className="gameplay-vazio">
                    <span>▶</span>
                    <p>Gameplay não disponível</p>
                  </div>
                )}

              </div>

              

            </div>

          </article>
        ))}

      </section>

    </main>
  );
}

export default Talentos;