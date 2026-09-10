import { useState } from "react";
import "../styles/dashboardTalentos.css";

function DashboardTalentos() {
  const [talentosIniciais, setTalentosIniciais] = useState(100);
  const [taxaCrescimento, setTaxaCrescimento] = useState(10);
  const [meses, setMeses] = useState(12);

  const calcularTalentos = (mes) => {
    return Math.round(
      talentosIniciais * Math.pow(1 + taxaCrescimento / 100, mes)
    );
  };

  const dados = [];

  for (let mes = 0; mes <= meses; mes++) {
    dados.push({
      mes,
      talentos: calcularTalentos(mes),
    });
  }

  const talentosFinais = calcularTalentos(meses);

  return (
    <main className="dashboard">
  <div className="dashboard-container">

    <h1>Crescimento de Talentos</h1>

      <p className="descricao">
        Projeção do crescimento de jogadores cadastrados no ScoutLink.
      </p>

      <section className="configuracao">
        <div>
          <label htmlFor="talentos">
            Talentos iniciais
          </label>

          <input
            id="talentos"
            type="number"
            min="1"
            value={talentosIniciais}
            onChange={(e) => setTalentosIniciais(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="taxa">
            Crescimento mensal (%)
          </label>

          <input
            id="taxa"
            type="number"
            min="0"
            value={taxaCrescimento}
            onChange={(e) => setTaxaCrescimento(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="meses">
            Período (meses)
          </label>

          <input
            id="meses"
            type="number"
            min="1"
            max="60"
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
          />
        </div>
      </section>

      <section className="resultado">
        <div className="card">
          <h2>Talentos iniciais</h2>
          <strong>{talentosIniciais}</strong>
        </div>

        <div className="card">
          <h2>Crescimento</h2>
          <strong>{taxaCrescimento}%</strong>
        </div>

        <div className="card">
          <h2>Projeção final</h2>
          <strong>{talentosFinais}</strong>
        </div>
      </section>

      

      <section className="modelo">
        <h2>Modelo matemático</h2>

        <p>
          T(t) = T₀ × (1 + r)ᵗ
        </p>

        <p>
          T(t) representa a quantidade de talentos após determinado
          período, T₀ é a quantidade inicial e r é a taxa de crescimento.
        </p>
      </section>



<section className="grafico">
  <h2>Gráfico de crescimento</h2>

  <div className="grafico-area">
    {dados.map((item, index) => {
      const maiorValor = talentosFinais;

      const altura =
        (item.talentos / maiorValor) * 100;

      return (
        <div className="ponto-grafico" key={item.mes}>
          <div
            className="barra"
            style={{ height: `${altura}%` }}
            title={`Mês ${item.mes}: ${item.talentos} talentos`}
          >
          </div>

          <span>Mês {item.mes}</span>
          <small>{item.talentos}</small>
        </div>
      );
    })}
  </div>
</section>

<section className="tabela"></section>


      <section className="tabela">
        <h2>Projeção de crescimento</h2>

        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Talentos cadastrados</th>
            </tr>
          </thead>

          <tbody>
            {dados.map((item) => (
              <tr key={item.mes}>
                <td>{item.mes}</td>
                <td>{item.talentos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      </div>
    </main>
  );
}

export default DashboardTalentos;