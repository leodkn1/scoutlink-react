function Home() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">

      <div className="text-center pt-10">
        <p className="text-2xl md:text-3xl text-red-500 mb-4">
          Conectando jogadores ao cenário profissional de eSports.
        </p>

        <button className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold transition">
          Cadastrar
        </button>
      </div>

      <div className="bg-red-800 mx-4 md:mx-10 my-10 p-8 rounded-xl text-center shadow-lg">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Vire um profissional
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4">

        <div className="bg-zinc-900 rounded-xl p-4 shadow-lg w-80 text-center">

          <img
            src="/img/foto.jpeg"
            alt="Guilherme"
            className="w-full h-80 object-cover rounded-lg"
          />

          <h3 className="text-2xl font-bold mt-4">
            GUILHERME
          </h3>

          <p className="text-red-400 mb-4">
            Valorant
          </p>

          <button className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition">
            Ver Mais
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl p-4 shadow-lg w-full max-w-3xl">
          <video
            className="w-full rounded-lg"
            controls
          >
            <source
              src="/video/valorantvideo.mp4"
              type="video/mp4"
            />
            Seu navegador não suporta vídeo.
          </video>
        </div>

      </div>

      <h2 className="text-center text-3xl md:text-4xl font-bold mt-16 mb-8 text-red-500">
        ORGANIZAÇÕES EM DESTAQUE
      </h2>

      <div className="flex flex-wrap justify-center gap-6 pb-10">

        <div className="bg-zinc-900 p-6 rounded-xl w-64 text-center shadow-lg">
          <img
            src="/img/loud.png"
            alt="LOUD"
            className="w-full h-40 object-contain mb-4"
          />
          <h3 className="text-2xl font-bold">LOUD</h3>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl w-64 text-center shadow-lg">
          <img
            src="/img/furia.jpg"
            alt="FURIA"
            className="w-full h-40 object-contain mb-4"
          />
          <h3 className="text-2xl font-bold">FURIA</h3>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl w-64 text-center shadow-lg">
          <img
            src="/img/mibr.jpg"
            alt="MIBR"
            className="w-full h-40 object-contain mb-4"
          />
          <h3 className="text-2xl font-bold">MIBR</h3>
        </div>

      </div>

    </div>
  );
}

export default Home;