import { useEffect, useState } from "react";

function Jogos() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    async function carregarJogos() {
      const resposta = await fetch("/jogos.json");
      const dados = await resposta.json();

      setJogos(dados);
    }

    carregarJogos();
  }, []);

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-5">
        Jogos
      </h1>

      <div className="row">

        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            className="col-md-3 mb-4"
          >
            <div className="card bg-dark text-light p-3 text-center">

              <img
                src={jogo.imagem}
                alt={jogo.nome}
                className="img-fluid mb-3"
                style={{
                  height: "200px",
                  objectFit: "contain"
                }}
              />

              <h3>{jogo.nome}</h3>

              <p>
                <strong>Categoria:</strong> {jogo.categoria}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Jogos;