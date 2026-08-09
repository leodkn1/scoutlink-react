import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleCadastro = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

   
    if (!nome.trim()) {
      setMessage("Digite seu nome.");
      setMessageType("error");
      return;
    }

    
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

   
    const savedUser = localStorage.getItem("scoutlinkUser");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user.email === email.trim().toLowerCase()) {
          setMessage("Este e-mail já está cadastrado.");
          setMessageType("error");
          return;
        }
      } catch (erro) {
        localStorage.removeItem("scoutlinkUser");
      }
    }

    
    const newUser = {
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    localStorage.setItem(
      "scoutlinkUser",
      JSON.stringify(newUser)
    );

    setMessage("Conta criada com sucesso!");
    setMessageType("success");

    
    setNome("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    
    setTimeout(() => {
      navigate("/login");
    }, 1200);
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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
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
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Ocultar"
                  : "Mostrar"}
              </button>

            </div>

          </div>


          <button
            type="submit"
            className="btn-cadastro"
          >
            Criar conta
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