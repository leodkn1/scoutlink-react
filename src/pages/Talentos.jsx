import { useEffect, useState } from "react";

function Talentos() {
  const [talentos, setTalentos] = useState([]);

  useEffect(() => {
    async function carregarTalentos() {
      const resposta = await fetch("/talentos.json");
      const dados = await resposta.json();

      setTalentos(dados);
    }

    carregarTalentos();
  }, []);

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        Talentos
      </h1>

      <div className="row">

        {talentos.map((talento) => (
          <div
            key={talento.id}
            className="col-md-4 mb-4"
          >
            <div className="card bg-dark text-light p-3">
              <img
                src={talento.foto}
                alt={talento.nome}
                className="img-fluid mb-3 rounded"
              />
              <h3>{talento.nome}</h3>

              <p>
                <strong>Jogo:</strong> {talento.jogo}
              </p>

              <p>
                <strong>Rank:</strong> {talento.rank}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Talentos;