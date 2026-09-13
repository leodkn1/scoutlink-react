import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import "../styles/organizacao.css";

function Organizacoes() {
  const [organizacoes, setOrganizacoes] = useState([]);
  const [talentos, setTalentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loadingTalentos, setLoadingTalentos] = useState(true);

  useEffect(() => {
    async function carregarOrganizacoes() {
      try {
        const resposta = await fetch("/organizacoes.json");
        const dados = await resposta.json();

        setOrganizacoes(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setOrganizacoes([]);
      }
    }

    async function carregarTalentos() {
      try {
        const snapshot = await getDocs(
          collection(db, "users")
        );

        const dados = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data()
          }))
          .filter(
            (talento) =>
              !talento.tipoUsuario ||
              talento.tipoUsuario === "jogador"
          );

        setTalentos(dados);
      } catch (erro) {
        console.error(erro);
      } finally {
        setLoadingTalentos(false);
      }
    }

    carregarOrganizacoes();
    carregarTalentos();
  }, []);

  const talentosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return talentos;
    }

    return talentos.filter((talento) => {
      const texto = [
        talento.nome,
        talento.nickname,
        talento.jogoPrincipal,
        talento.jogo,
        talento.rank,
        talento.funcao,
        talento.cidade
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return texto.includes(termo);
    });
  }, [busca, talentos]);

  return (
    <main className="organizacoes-page">
      <section className="organizacoes-header">
        <h1>Organizações em Destaque</h1>

        <p>
          Conheça organizações e equipes que fazem parte do
          cenário competitivo de eSports.
        </p>
      </section>

      <section className="organizacoes-grid">
        {organizacoes.map((organizacao) => (
          <article
            className="organizacao-card"
            key={organizacao.id}
          >
            <div className="organizacao-logo-container">
              {organizacao.logo ? (
                <img
                  src={organizacao.logo}
                  alt={`Logo ${organizacao.nome}`}
                  className="organizacao-logo"
                />
              ) : (
                <div className="organizacao-logo-text">
                  {organizacao.nome
                    ?.substring(0, 4)
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className="organizacao-info">
              <span className="organizacao-label">
                ORGANIZAÇÃO
              </span>

              <h2>{organizacao.nome}</h2>

              <p className="organizacao-descricao">
                {organizacao.descricao}
              </p>

              <div className="organizacao-jogos">
                {organizacao.jogos?.map((jogo, index) => (
                  <span key={index}>
                    {jogo}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="organizacoes-talentos">
        <div className="organizacoes-talentos-header">
          <div>
            <span className="organizacao-label">
              SCOUTLINK • RECRUTAMENTO
            </span>

            <h2>Encontre novos talentos</h2>

            <p>
              Pesquise jogadores cadastrados na plataforma e
              encontre perfis com potencial competitivo.
            </p>
          </div>

          <div className="organizacoes-busca">
            <span>BUSCAR JOGADOR</span>

            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome, jogo, rank ou função..."
            />
          </div>
        </div>

        <div className="organizacoes-talentos-status">
          <strong>
            {busca
              ? `${talentosFiltrados.length} talento(s) encontrado(s)`
              : `${talentos.length} talento(s) cadastrado(s)`}
          </strong>

          {busca && (
            <button
              type="button"
              onClick={() => setBusca("")}
            >
              Limpar busca
            </button>
          )}
        </div>

        {loadingTalentos ? (
          <div className="organizacoes-talentos-carregando">
            <span>Carregando talentos...</span>
          </div>
        ) : talentosFiltrados.length === 0 ? (
          <div className="organizacoes-talentos-vazio">
            <div className="organizacoes-vazio-icon">
              ?
            </div>

            <div>
              <strong>
                {busca
                  ? "Nenhum talento encontrado"
                  : "Nenhum talento cadastrado"}
              </strong>

              <p>
                {busca
                  ? "Tente pesquisar por outro nome, jogo, rank, função ou região."
                  : "Quando jogadores criarem seus perfis, eles aparecerão aqui para as organizações encontrarem novos talentos."}
              </p>
            </div>
          </div>
        ) : (
          <div className="organizacoes-talentos-grid">
            {talentosFiltrados.map((talento) => (
              <article
                className="organizacao-talento-card"
                key={talento.id}
              >
                <div className="organizacao-talento-foto">
                  {talento.foto ? (
                    <img
                      src={talento.foto}
                      alt={talento.nome || "Jogador"}
                    />
                  ) : (
                    <span>
                      {talento.nome
                        ?.charAt(0)
                        ?.toUpperCase() || "S"}
                    </span>
                  )}
                </div>

                <div className="organizacao-talento-info">
                  <span className="talento-card-label">
                    TALENTO
                  </span>

                  <h3>
                    {talento.nome || "Jogador"}
                  </h3>

                  {talento.nickname && (
                    <p className="talento-card-nickname">
                      @{talento.nickname}
                    </p>
                  )}

                  <div className="talento-card-dados">
                    <span>
                      <small>JOGO</small>
                      {talento.jogoPrincipal ||
                        talento.jogo ||
                        "Não informado"}
                    </span>

                    <span>
                      <small>RANK</small>
                      {talento.rank ||
                        "Não informado"}
                    </span>

                    <span>
                      <small>FUNÇÃO</small>
                      {talento.funcao ||
                        "Não informado"}
                    </span>

                    <span>
                      <small>REGIÃO</small>
                      {talento.cidade ||
                        "Não informado"}
                    </span>
                  </div>

                  <Link
                    to="/talentos"
                    className="organizacao-ver-perfil"
                  >
                    Ver talentos
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="organizacoes-cta">
        <div>
          <span className="organizacao-label">
            SCOUTLINK
          </span>

          <h2>
            Seu próximo talento pode estar aqui.
          </h2>

          <p>
            Explore perfis conheça jogadores e  descubra
            novos nomes para o cenário competitivo.
          </p>
        </div>

        <Link
          to="/talentos"
          className="organizacao-ver-perfil"
        >
          Ver talentos
        </Link>
      </section>
    </main>
  );
}

export default Organizacoes;