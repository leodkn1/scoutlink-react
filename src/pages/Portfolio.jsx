import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../services/firebase";
import "../styles/portfolio.css";

function Portfolio() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    jogo: "",
    descricao: "",
    videoUrl: "",
    imagemUrl: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      try {
        const materiaisRef = collection(
          db,
          "users",
          currentUser.uid,
          "portfolio"
        );

        const materiaisQuery = query(
          materiaisRef,
          orderBy("criadoEm", "desc")
        );

        const materiaisSnap = await getDocs(materiaisQuery);

        const lista = materiaisSnap.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }));

        setMateriais(lista);

        const perfilSnap = await getDocs(
          collection(db, "users")
        );

        const perfilEncontrado = perfilSnap.docs.find(
          (item) => item.id === currentUser.uid
        );

        if (perfilEncontrado) {
          setPerfil(perfilEncontrado.data());
        }
      } catch (error) {
        console.error(error);
        setMessage("Não foi possível carregar seu portfólio.");
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

  const limparFormulario = () => {
    setForm({
      titulo: "",
      jogo: "",
      descricao: "",
      videoUrl: "",
      imagemUrl: ""
    });

    setEditandoId(null);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();

    if (!user) return;

    if (!form.titulo.trim()) {
      setMessage("Digite um título para o material.");
      setMessageType("error");
      return;
    }

    if (!form.jogo.trim()) {
      setMessage("Digite o jogo relacionado ao material.");
      setMessageType("error");
      return;
    }

    try {
      setSalvando(true);
      setMessage("");

      const dados = {
        titulo: form.titulo.trim(),
        jogo: form.jogo.trim(),
        descricao: form.descricao.trim(),
        videoUrl: form.videoUrl.trim(),
        imagemUrl: form.imagemUrl.trim(),
        atualizadoEm: serverTimestamp()
      };

      if (editandoId) {
        const materialRef = doc(
          db,
          "users",
          user.uid,
          "portfolio",
          editandoId
        );

        await updateDoc(materialRef, dados);

        setMateriais((atual) =>
          atual.map((material) =>
            material.id === editandoId
              ? {
                  ...material,
                  ...dados
                }
              : material
          )
        );

        setMessage("Material atualizado com sucesso!");
      } else {
        const materialRef = await addDoc(
          collection(db, "users", user.uid, "portfolio"),
          {
            ...dados,
            criadoEm: serverTimestamp()
          }
        );

        setMateriais((atual) => [
          {
            id: materialRef.id,
            ...dados
          },
          ...atual
        ]);

        setMessage("Material adicionado ao portfólio!");
      }

      setMessageType("success");
      limparFormulario();
    } catch (error) {
      console.error(error);
      setMessage("Não foi possível salvar o material.");
      setMessageType("error");
    } finally {
      setSalvando(false);
    }
  };

  const handleEditar = (material) => {
    setEditandoId(material.id);

    setForm({
      titulo: material.titulo || "",
      jogo: material.jogo || "",
      descricao: material.descricao || "",
      videoUrl: material.videoUrl || "",
      imagemUrl: material.imagemUrl || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleExcluir = async (id) => {
    if (!user) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este material?"
    );

    if (!confirmar) return;

    try {
      await deleteDoc(
        doc(db, "users", user.uid, "portfolio", id)
      );

      setMateriais((atual) =>
        atual.filter((material) => material.id !== id)
      );

      setMessage("Material excluído.");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("Não foi possível excluir o material.");
      setMessageType("error");
    }
  };

  if (loading) {
    return (
      <main className="portfolio-container">
        <p>Carregando portfólio...</p>
      </main>
    );
  }

  return (
    <main className="portfolio-container">
      <div className="portfolio-box">
        <div className="portfolio-header">
          <div>
            <span className="portfolio-tag">
              SCOUTLINK • PORTFÓLIO
            </span>

            <h1>
              {perfil?.nome || user?.email || "Meu portfólio"}
            </h1>

            <p>
              Apresente sua trajetória, seus jogos e seus melhores
              momentos competitivos.
            </p>
          </div>

          <button
            className="portfolio-profile-button"
            onClick={() => navigate("/perfil")}
          >
            Meu perfil
          </button>
        </div>

        <section className="portfolio-form-section">
          <div className="portfolio-section-title">
            <h2>
              {editandoId
                ? "Editar material"
                : "Adicionar material"}
            </h2>

            <p>
              Você pode usar links externos para vídeos e imagens.
            </p>
          </div>

          <form
            className="portfolio-form"
            onSubmit={handleSalvar}
          >
            <div className="portfolio-form-group">
              <label>Título</label>
              <input
                value={form.titulo}
                onChange={(e) =>
                  handleChange("titulo", e.target.value)
                }
                placeholder="Ex: Melhor partida no campeonato"
              />
            </div>

            <div className="portfolio-form-group">
              <label>Jogo</label>
              <input
                value={form.jogo}
                onChange={(e) =>
                  handleChange("jogo", e.target.value)
                }
                placeholder="Ex: Valorant"
              />
            </div>

            <div className="portfolio-form-group portfolio-full">
              <label>Descrição</label>
              <textarea
                value={form.descricao}
                onChange={(e) =>
                  handleChange("descricao", e.target.value)
                }
                placeholder="Descreva este trabalho, partida ou conquista."
                rows="4"
              />
            </div>

            <div className="portfolio-form-group">
              <label>URL do vídeo</label>
              <input
                value={form.videoUrl}
                onChange={(e) =>
                  handleChange("videoUrl", e.target.value)
                }
                placeholder="https://..."
              />
            </div>

            <div className="portfolio-form-group">
              <label>URL da imagem</label>
              <input
                value={form.imagemUrl}
                onChange={(e) =>
                  handleChange("imagemUrl", e.target.value)
                }
                placeholder="https://..."
              />
            </div>

            <div className="portfolio-form-actions">
              <button
                className="portfolio-save-button"
                type="submit"
                disabled={salvando}
              >
                {salvando
                  ? "Salvando..."
                  : editandoId
                    ? "Atualizar material"
                    : "Adicionar ao portfólio"}
              </button>

              {editandoId && (
                <button
                  className="portfolio-cancel-button"
                  type="button"
                  onClick={limparFormulario}
                  disabled={salvando}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {message && (
            <p className={`portfolio-message ${messageType}`}>
              {message}
            </p>
          )}
        </section>

        <section className="portfolio-list-section">
          <div className="portfolio-section-title">
            <h2>Meu trabalho</h2>
            <p>
              {materiais.length}{" "}
              {materiais.length === 1
                ? "material cadastrado"
                : "materiais cadastrados"}
            </p>
          </div>

          {materiais.length === 0 ? (
            <div className="portfolio-empty">
              <h3>Seu portfólio ainda está vazio</h3>
              <p>
                Adicione seu primeiro vídeo, imagem ou destaque
                competitivo usando o formulário acima.
              </p>
            </div>
          ) : (
            <div className="portfolio-grid">
              {materiais.map((material) => (
                <article
                  className="portfolio-card"
                  key={material.id}
                >
                  {material.imagemUrl && (
                    <div className="portfolio-image">
                      <img
                        src={material.imagemUrl}
                        alt={material.titulo}
                      />
                    </div>
                  )}

                  <div className="portfolio-card-content">
                    <span className="portfolio-game">
                      {material.jogo}
                    </span>

                    <h3>{material.titulo}</h3>

                    {material.descricao && (
                      <p>{material.descricao}</p>
                    )}

                    {material.videoUrl && (
                      <a
                        className="portfolio-video"
                        href={material.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Assistir vídeo
                      </a>
                    )}

                    <div className="portfolio-card-actions">
                      <button
                        onClick={() => handleEditar(material)}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          handleExcluir(material.id)
                        }
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Portfolio;