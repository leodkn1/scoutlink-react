import { useEffect, useState } from "react";

function Organizacoes() {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    async function carregarOrganizacoes() {
      const resposta = await fetch("/organizacoes.json");
      const dados = await resposta.json();

      setOrgs(dados);
    }

    carregarOrganizacoes();
  }, []);

  return (
    <div className="container mt-5">

      <h1 className="text-center mb-5">
        Organizações
      </h1>

      <div className="row">

        {orgs.map((org) => (
          <div
            key={org.id}
            className="col-md-4 mb-4"
          >
            <div className="card bg-dark text-light p-3 text-center">

              <img
                src={org.logo}
                alt={org.nome}
                className="img-fluid mb-3"
                style={{ height: "200px", objectFit: "contain" }}
              />

              <h3>{org.nome}</h3>

              <p>
                <strong>Jogo:</strong> {org.jogo}
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Organizacoes;