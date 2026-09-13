import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import "../styles/perfil.css";

function Perfil() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editando, setEditando] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      try {
        const perfilRef = doc(db, "users", currentUser.uid);
        const perfilSnap = await getDoc(perfilRef);

        if (perfilSnap.exists()) {
          const dados = perfilSnap.data();

          const perfilCompleto = {
            nome: dados.nome || "",
            email: dados.email || currentUser.email || "",
            nickname: dados.nickname || "",
            foto: dados.foto || "",
            jogoPrincipal: dados.jogoPrincipal || "",
            rank: dados.rank || "",
            cidade: dados.cidade || "",
            bio: dados.bio || "",
            funcao: dados.funcao || "",
            timesAnteriores: dados.timesAnteriores || [],
            conquistas: dados.conquistas || [],
            redesSociais: {
              instagram: dados.redesSociais?.instagram || "",
              youtube: dados.redesSociais?.youtube || "",
              twitch: dados.redesSociais?.twitch || "",
              discord: dados.redesSociais?.discord || ""
            },
            estatisticas: dados.estatisticas || "",
            horasJogo: dados.horasJogo || "",
            disponibilidade: dados.disponibilidade || ""
          };

          setPerfil(perfilCompleto);
          setForm(perfilCompleto);
        } else {
          const perfilInicial = {
            nome: currentUser.displayName || "",
            email: currentUser.email || "",
            nickname: "",
            foto: "",
            jogoPrincipal: "",
            rank: "",
            cidade: "",
            bio: "",
            funcao: "",
            timesAnteriores: [],
            conquistas: [],
            redesSociais: {
              instagram: "",
              youtube: "",
              twitch: "",
              discord: ""
            },
            estatisticas: "",
            horasJogo: "",
            disponibilidade: ""
          };

          setPerfil(perfilInicial);
          setForm(perfilInicial);
        }
      } catch (error) {
        console.error(error);
        setMessage("Não foi possível carregar seu perfil.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (campo, valor) => {
    setForm((atual) => ({
      ...atual,
      [campo]: valor
    }));
  };

  const handleRedeChange = (rede, valor) => {
    setForm((atual) => ({
      ...atual,
      redesSociais: {
        ...atual.redesSociais,
        [rede]: valor
      }
    }));
  };

  const handleListaChange = (campo, valor) => {
    setForm((atual) => ({
      ...atual,
      [campo]: valor
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    }));
  };

  const handleSalvar = async () => {
    if (!user || !form) return;

    try {
      setSaving(true);
      setMessage("");

      const perfilRef = doc(db, "users", user.uid);

      await updateDoc(perfilRef, {
        nome: form.nome.trim(),
        nickname: form.nickname.trim(),
        foto: form.foto.trim(),
        jogoPrincipal: form.jogoPrincipal.trim(),
        rank: form.rank.trim(),
        cidade: form.cidade.trim(),
        bio: form.bio.trim(),
        funcao: form.funcao.trim(),
        timesAnteriores: form.timesAnteriores,
        conquistas: form.conquistas,
        redesSociais: form.redesSociais,
        estatisticas: form.estatisticas.trim(),
        horasJogo: form.horasJogo.trim(),
        disponibilidade: form.disponibilidade.trim()
      });

      setPerfil(form);
      setEditando(false);
      setMessage("Perfil atualizado com sucesso!");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("Não foi possível salvar as alterações.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelar = () => {
    setForm(perfil);
    setEditando(false);
    setMessage("");
  };

  if (loading) {
    return (
      <main className="perfil-container">
        <p>Carregando perfil...</p>
      </main>
    );
  }

  if (!perfil || !form) {
    return (
      <main className="perfil-container">
        <div className="perfil-box">
          <h1>Meu Perfil</h1>
          <p>Não foi possível carregar seus dados.</p>
        </div>
      </main>
    );
  }

  if (editando) {
    return (
      <main className="perfil-container">
        <div className="perfil-box">
          <div className="perfil-edit-header">
            <div>
              <span className="perfil-tag">SCOUTLINK • PERFIL</span>
              <h1>Editar perfil</h1>
              <p>Atualize suas informações profissionais.</p>
            </div>
          </div>

          <div className="perfil-form">
            <div className="perfil-form-group">
              <label>Nome</label>
              <input
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className="perfil-form-group">
              <label>Nickname</label>
              <input
                value={form.nickname}
                onChange={(e) =>
                  handleChange("nickname", e.target.value)
                }
                placeholder="Seu nickname"
              />
            </div>

            <div className="perfil-form-group">
              <label>E-mail</label>
              <input
                value={form.email}
                disabled
              />
              <small>
                O e-mail da conta é gerenciado pelo Firebase.
              </small>
            </div>

            <div className="perfil-form-group">
              <label>Foto de perfil</label>
              <input
                value={form.foto}
                onChange={(e) => handleChange("foto", e.target.value)}
                placeholder="Cole aqui a URL da sua imagem"
              />
            </div>

            <div className="perfil-form-group">
              <label>Jogo principal</label>
              <input
                value={form.jogoPrincipal}
                onChange={(e) =>
                  handleChange("jogoPrincipal", e.target.value)
                }
                placeholder="Ex: Valorant"
              />
            </div>

            <div className="perfil-form-group">
              <label>Rank</label>
              <input
                value={form.rank}
                onChange={(e) => handleChange("rank", e.target.value)}
                placeholder="Ex: Immortal 3"
              />
            </div>

            <div className="perfil-form-group">
              <label>Cidade / Região</label>
              <input
                value={form.cidade}
                onChange={(e) =>
                  handleChange("cidade", e.target.value)
                }
                placeholder="Ex: São Paulo - SP"
              />
            </div>

            <div className="perfil-form-group">
              <label>Função</label>
              <input
                value={form.funcao}
                onChange={(e) =>
                  handleChange("funcao", e.target.value)
                }
                placeholder="Ex: Duelista"
              />
            </div>

            <div className="perfil-form-group perfil-form-full">
              <label>Sobre mim</label>
              <textarea
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Conte um pouco sobre você como jogador."
                rows="5"
              />
            </div>

            <div className="perfil-form-group">
              <label>Horas jogadas</label>
              <input
                value={form.horasJogo}
                onChange={(e) =>
                  handleChange("horasJogo", e.target.value)
                }
                placeholder="Ex: 2500 horas"
              />
            </div>

            <div className="perfil-form-group">
              <label>Disponibilidade</label>
              <input
                value={form.disponibilidade}
                onChange={(e) =>
                  handleChange("disponibilidade", e.target.value)
                }
                placeholder="Ex: Noite e finais de semana"
              />
            </div>

            <div className="perfil-form-group perfil-form-full">
              <label>Estatísticas</label>
              <textarea
                value={form.estatisticas}
                onChange={(e) =>
                  handleChange("estatisticas", e.target.value)
                }
                placeholder="Ex: K/D 1.25 • 55% win rate • 180 ACS"
                rows="3"
              />
            </div>

            <div className="perfil-form-group perfil-form-full">
              <label>Times anteriores</label>
              <textarea
                value={form.timesAnteriores.join("\n")}
                onChange={(e) =>
                  handleListaChange(
                    "timesAnteriores",
                    e.target.value
                  )
                }
                placeholder={"Digite um time por linha"}
                rows="4"
              />
            </div>

            <div className="perfil-form-group perfil-form-full">
              <label>Conquistas</label>
              <textarea
                value={form.conquistas.join("\n")}
                onChange={(e) =>
                  handleListaChange("conquistas", e.target.value)
                }
                placeholder={"Digite uma conquista por linha"}
                rows="4"
              />
            </div>

            <div className="perfil-form-group">
              <label>Instagram</label>
              <input
                value={form.redesSociais.instagram}
                onChange={(e) =>
                  handleRedeChange("instagram", e.target.value)
                }
                placeholder="@seuusuario"
              />
            </div>

            <div className="perfil-form-group">
              <label>YouTube</label>
              <input
                value={form.redesSociais.youtube}
                onChange={(e) =>
                  handleRedeChange("youtube", e.target.value)
                }
                placeholder="Link do canal"
              />
            </div>

            <div className="perfil-form-group">
              <label>Twitch</label>
              <input
                value={form.redesSociais.twitch}
                onChange={(e) =>
                  handleRedeChange("twitch", e.target.value)
                }
                placeholder="Link da Twitch"
              />
            </div>

            <div className="perfil-form-group">
              <label>Discord</label>
              <input
                value={form.redesSociais.discord}
                onChange={(e) =>
                  handleRedeChange("discord", e.target.value)
                }
                placeholder="Seu Discord"
              />
            </div>
          </div>

          {message && (
            <p className={`msg ${messageType}`}>
              {message}
            </p>
          )}

          <div className="perfil-actions">
            <button
              className="perfil-edit-button"
              onClick={handleSalvar}
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar alterações"}
            </button>

            <button
              className="perfil-portfolio-button"
              onClick={handleCancelar}
              disabled={saving}
            >
              Cancelar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="perfil-container">
      <div className="perfil-box">
        <div className="perfil-header">
          <div className="perfil-foto">
            {perfil.foto ? (
              <img src={perfil.foto} alt={perfil.nome} />
            ) : (
              <span>
                {perfil.nome?.charAt(0)?.toUpperCase() || "S"}
              </span>
            )}
          </div>

          <div className="perfil-title">
            <span className="perfil-tag">
              JOGADOR SCOUTLINK
            </span>

            <h1>{perfil.nome || "Jogador"}</h1>

            {perfil.nickname && <p>@{perfil.nickname}</p>}
          </div>
        </div>

        <div className="perfil-info-grid">
          <div className="perfil-card">
            <span>Jogo principal</span>
            <strong>
              {perfil.jogoPrincipal || "Não informado"}
            </strong>
          </div>

          <div className="perfil-card">
            <span>Rank</span>
            <strong>
              {perfil.rank || "Não informado"}
            </strong>
          </div>

          <div className="perfil-card">
            <span>Região</span>
            <strong>
              {perfil.cidade || "Não informado"}
            </strong>
          </div>

          <div className="perfil-card">
            <span>Função</span>
            <strong>
              {perfil.funcao || "Não informado"}
            </strong>
          </div>
        </div>

        <section className="perfil-section">
          <h2>Sobre mim</h2>
          <p>
            {perfil.bio || "Adicione uma descrição ao seu perfil."}
          </p>
        </section>

        <section className="perfil-section">
          <h2>Contato</h2>
          <p>{user.email}</p>
        </section>

        <section className="perfil-section">
          <h2>Estatísticas</h2>

          <div className="perfil-stats">
            <div>
              <span>Horas jogadas</span>
              <strong>
                {perfil.horasJogo || "Não informado"}
              </strong>
            </div>

            <div>
              <span>Estatísticas</span>
              <strong>
                {perfil.estatisticas || "Não informado"}
              </strong>
            </div>

            <div>
              <span>Disponibilidade</span>
              <strong>
                {perfil.disponibilidade || "Não informado"}
              </strong>
            </div>
          </div>
        </section>

        <section className="perfil-section">
          <h2>Conquistas</h2>

          {perfil.conquistas.length > 0 ? (
            <ul className="perfil-list">
              {perfil.conquistas.map((conquista, index) => (
                <li key={index}>{conquista}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma conquista cadastrada.</p>
          )}
        </section>

        <section className="perfil-section">
          <h2>Times anteriores</h2>

          {perfil.timesAnteriores.length > 0 ? (
            <ul className="perfil-list">
              {perfil.timesAnteriores.map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhum time cadastrado.</p>
          )}
        </section>

        <section className="perfil-section">
          <h2>Redes sociais</h2>

          <div className="perfil-redes">
            {perfil.redesSociais.instagram && (
              <span>
                Instagram: {perfil.redesSociais.instagram}
              </span>
            )}

            {perfil.redesSociais.youtube && (
              <span>
                YouTube: {perfil.redesSociais.youtube}
              </span>
            )}

            {perfil.redesSociais.twitch && (
              <span>
                Twitch: {perfil.redesSociais.twitch}
              </span>
            )}

            {perfil.redesSociais.discord && (
              <span>
                Discord: {perfil.redesSociais.discord}
              </span>
            )}

            {!perfil.redesSociais.instagram &&
              !perfil.redesSociais.youtube &&
              !perfil.redesSociais.twitch &&
              !perfil.redesSociais.discord && (
                <span>Nenhuma rede social cadastrada.</span>
              )}
          </div>
        </section>

        {message && (
          <p className={`msg ${messageType}`}>
            {message}
          </p>
        )}

        <div className="perfil-actions">
          <button
            className="perfil-edit-button"
            onClick={() => {
              setMessage("");
              setEditando(true);
            }}
          >
            Editar perfil
          </button>

          <button
            className="perfil-portfolio-button"
            onClick={() => navigate("/portfolio")}
          >
            Ver meu portfólio
          </button>
        </div>
      </div>
    </main>
  );
}

export default Perfil;