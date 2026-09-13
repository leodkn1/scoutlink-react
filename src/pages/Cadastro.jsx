import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import "../styles/cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const nomeNormalizado = nome.trim();
    const emailNormalizado = email.trim().toLowerCase();

    if (!nomeNormalizado) {
      setMessage("Digite seu nome.");
      setMessageType("error");
      return;
    }

    if (!emailNormalizado) {
      setMessage("Digite seu e-mail.");
      setMessageType("error");
      return;
    }

    if (!emailNormalizado.includes("@")) {
      setMessage("Digite um e-mail válido.");
      setMessageType("error");
      return;
    }

    if (!password) {
      setMessage("Digite uma senha.");
      setMessageType("error");
      return;
    }

    if (password.length < 8) {
      setMessage("A senha deve ter pelo menos 8 caracteres.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailNormalizado,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        nome: nomeNormalizado,
        email: emailNormalizado,
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
        disponibilidade: "",
        tipoUsuario: "jogador",
        criadoEm: new Date().toISOString()
      });

      setMessage("Conta criada com sucesso!");
      setMessageType("success");

      setNome("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (erro) {
      if (erro.code === "auth/email-already-in-use") {
        setMessage("Este e-mail já está cadastrado.");
      } else if (erro.code === "auth/invalid-email") {
        setMessage("Digite um e-mail válido.");
      } else if (erro.code === "auth/weak-password") {
        setMessage("A senha precisa ser mais forte.");
      } else if (erro.code === "permission-denied") {
        setMessage("Não foi possível salvar o perfil no banco de dados.");
      } else {
        setMessage("Erro ao criar a conta. Tente novamente.");
      }

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cadastro-container">
      <div className="cadastro-box">
        <div className="cadastro-logo">
          <img
            src="/img/SCOUTLINK.png"
            alt="ScoutLink"
          />
        </div>

        <span className="cadastro-tag">
          SCOUTLINK • ESPORTS
        </span>

        <h1>
          Criar conta
        </h1>

        <p className="cadastro-description">
          Crie sua conta e faça parte do cenário competitivo.
        </p>

        <form onSubmit={handleCadastro}>
          <div className="input-group">
            <label htmlFor="nome">
              Nome
            </label>

            <input
              id="nome"
              className="input"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">
              E-mail
            </label>

            <input
              id="email"
              className="input"
              type="email"
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Senha
            </label>

            <div className="password-container">
              <input
                id="password"
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo de 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">
              Confirmar senha
            </label>

            <div className="password-container">
              <input
                id="confirmPassword"
                className="input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-cadastro"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        {message && (
          <p className={`msg ${messageType}`}>
            {message}
          </p>
        )}

        <div className="cadastro-divider">
          <span>Já possui uma conta?</span>
        </div>

        <button
          className="btn-login"
          onClick={() => navigate("/login")}
        >
          Entrar
        </button>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Voltar para Home
        </button>
      </div>
    </main>
  );
}

export default Cadastro;