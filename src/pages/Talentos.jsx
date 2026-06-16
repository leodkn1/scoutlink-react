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
    <div className="bg-zinc-950 min-h-screen text-white p-8">

      <h1 className="text-center text-5xl font-bold text-red-500 mb-10">
        Talentos
      </h1>

      <div className="flex flex-wrap justify-center gap-8">

        {talentos.map((talento) => (
          <div
            key={talento.id}
            className="bg-zinc-900 rounded-xl p-5 w-72 shadow-lg hover:scale-105 transition"
          >

            <img
              src={talento.foto}
              alt={talento.nome}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold text-center mb-2">
              {talento.nome}
            </h3>

            <p className="text-center text-red-400 mb-1">
              {talento.jogo}
            </p>

            <p className="text-center">
              Rank: {talento.rank}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Talentos;