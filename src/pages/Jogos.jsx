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
    <div className="bg-zinc-950 min-h-screen text-white p-8">

      <h1 className="text-center text-5xl font-bold text-red-500 mb-10">
        Jogos
      </h1>

      <div className="flex flex-wrap justify-center gap-8">

        {jogos.map((jogo) => (
          <div
            key={jogo.id}
            className="bg-zinc-900 rounded-xl p-5 w-72 shadow-lg hover:scale-105 transition"
          >

            <img
              src={jogo.imagem}
              alt={jogo.nome}
              className="w-full h-48 object-contain mb-4"
            />

            <h3 className="text-2xl font-bold text-center mb-2">
              {jogo.nome}
            </h3>

            <p className="text-center text-red-400">
              {jogo.categoria}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Jogos;