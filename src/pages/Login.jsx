import { useState, useEffect } from "react";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    setMessage(data.message);

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify({ email }));
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setMessage(`Você já está logado como ${parsedUser.email} 🚀`);
    }
  }, []);

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>ScoutLink Login</h1>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-login" onClick={handleLogin}>
          Entrar
        </button>

        {message && <p className="msg">{message}</p>}

      </div>

    </div>
  );
}

export default Login;