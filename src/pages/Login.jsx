import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMessage(`Você já está logado como ${user.email}`);
        setMessageType("success");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const emailNormalizado = email.trim().toLowerCase();

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
      setMessage("Digite sua senha.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        emailNormalizado,
        password
      );

      setMessage("Login realizado com sucesso!");
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (erro) {
      if (
        erro.code === "auth/invalid-credential" ||
        erro.code === "auth/wrong-password" ||
        erro.code === "auth/user-not-found"
      ) {
        setMessage("E-mail ou senha incorretos.");
      } else if (erro.code === "auth/too-many-requests") {
        setMessage("Muitas tentativas. Aguarde alguns minutos.");
      } else if (erro.code === "auth/invalid-email") {
        setMessage("Digite um e-mail válido.");
      } else {
        setMessage("Erro ao realizar login. Tente novamente.");
      }

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img
            src="/img/SCOUTLINK.png"
            alt="ScoutLink"
          />
        </div>

        <span className="login-tag">
          SCOUTLINK • ESPORTS
        </span>

        <h1>
          Bem-vindo de volta
        </h1>

        <p className="login-description">
          Entre na sua conta para continuar explorando
          o cenário competitivo.
        </p>

        <form onSubmit={handleLogin}>
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
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {message && (
          <p className={`msg ${messageType}`}>
            {message}
          </p>
        )}

        <div className="login-divider">
          <span>ou</span>
        </div>

        <button
          className="btn-cadastro"
          onClick={() => navigate("/cadastro")}
        >
          Criar uma conta
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

export default Login;