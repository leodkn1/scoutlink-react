import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);

        setMessage(
          `Você já está logado como ${parsedUser.email}`
        );

        setMessageType("success");
      } catch (erro) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

   
    if (!email.trim()) {
      setMessage("Digite seu e-mail.");
      setMessageType("error");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Digite um e-mail válido.");
      setMessageType("error");
      return;
    }

   
    if (!password) {
      setMessage("Digite sua senha.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedUser = localStorage.getItem("scoutlinkUser");

      if (!savedUser) {
        setMessage(
          "Nenhuma conta encontrada. Crie uma conta primeiro."
        );

        setMessageType("error");
        setLoading(false);
        return;
      }

      try {
        const user = JSON.parse(savedUser);

        if (
          user.email === email.trim().toLowerCase() &&
          user.password === password
        ) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: user.email,
              nome: user.nome,
            })
          );

          setMessage("Login realizado com sucesso!");
          setMessageType("success");

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setMessage("E-mail ou senha incorretos.");
          setMessageType("error");
        }
      } catch (erro) {
        console.error("Erro ao verificar usuário:", erro);

        setMessage("Erro ao realizar login.");
        setMessageType("error");
      }

      setLoading(false);
    }, 500);
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
                onClick={() => setShowPassword(!showPassword)}
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