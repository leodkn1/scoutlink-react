
const STATUS = {
  APROVADO: "APROVADO",
  REVISAR: "REVISAR",
  BLOQUEADO: "BLOQUEADO"
};

function responder(res, status, dados) {
  return res.status(status).json(dados);
}

function obterResultado(texto) {
  const resultado = texto.match(/RESULTADO:\s*(APROVADO|REVISAR|BLOQUEADO)/i);
  const motivo = texto.match(/MOTIVO:\s*([^\r\n]+)/i);

  if (!resultado) {
    return {
      status: STATUS.REVISAR,
      motivo: "A IA não retornou uma classificação válida."
    };
  }

  return {
    status: resultado[1].toUpperCase(),
    motivo: motivo
      ? motivo[1].trim().slice(0, 500)
      : "Conteúdo analisado."
  };
}

function contemCredencial(texto) {
  const padroes = [
    /\bsenha\s*[:=]\s*\S+/i,
    /\bpassword\s*[:=]\s*\S+/i,
    /\bminha senha é\s+\S+/i,
    /\bminha senha e\s+\S+/i,
    /\btoken\s*[:=]\s*\S+/i,
    /\bapi[_ -]?key\s*[:=]\s*\S+/i,
    /\bchave privada\s*[:=]\s*\S+/i
  ];

  return padroes.some((padrao) => padrao.test(texto));
}

async function verificarToken(token) {
  const apiKey = process.env.FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error("FIREBASE_API_KEY não configurada.");
  }

  const resposta = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idToken: token
      })
    }
  );

  if (!resposta.ok) {
    return false;
  }

  const dados = await resposta.json();
  return Array.isArray(dados.users) && dados.users.length > 0;
}

async function executarLangflow(conteudo, tipo) {
  const servidor = process.env.LANGFLOW_SERVER_URL;
  const fluxo = process.env.LANGFLOW_FLOW_ID;
  const chave = process.env.LANGFLOW_API_KEY;

  if (!servidor || !fluxo || !chave) {
    throw new Error("Configuração do Langflow incompleta.");
  }

  const resposta = await fetch(
    `${servidor.replace(/\/+$/, "")}/api/v1/run/${fluxo}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": chave
      },
      body: JSON.stringify({
        input_value: `Analise este conteúdo do tipo ${tipo}:\n${conteudo}`,
        input_type: "chat",
        output_type: "chat"
      }),
      signal: AbortSignal.timeout(50000)
    }
  );

  if (!resposta.ok) {
  console.error("Langflow HTTP status:", resposta.status);
  throw new Error("O Langflow não conseguiu analisar o conteúdo.");
}

  const dados = await resposta.json();
  const textos = [];

  function coletarTextos(valor) {
    if (typeof valor === "string") {
      textos.push(valor);
      return;
    }

    if (Array.isArray(valor)) {
      valor.forEach(coletarTextos);
      return;
    }

    if (valor && typeof valor === "object") {
      if (typeof valor.text === "string") {
        textos.push(valor.text);
      }

      Object.entries(valor).forEach(([chave, item]) => {
        if (chave !== "text") {
          coletarTextos(item);
        }
      });
    }
  }

  coletarTextos(dados);

  const texto = [...new Set(textos)]
    .filter(Boolean)
    .join("\n");

  if (!texto.trim()) {
    return {
      status: STATUS.REVISAR,
      motivo: "A IA retornou uma resposta vazia."
    };
  }

  return obterResultado(texto);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return responder(res, 405, {
      erro: "Método não permitido."
    });
  }

  try {
    const autorizacao = req.headers.authorization || "";
    const token = autorizacao.startsWith("Bearer ")
      ? autorizacao.slice(7)
      : "";

    if (!token || !(await verificarToken(token))) {
      return responder(res, 401, {
        erro: "Faça login para analisar o conteúdo."
      });
    }

    const conteudo = req.body?.content;
    const tipo = req.body?.tipo;

    if (
      typeof conteudo !== "string" ||
      !conteudo.trim() ||
      conteudo.length > 12000
    ) {
      return responder(res, 400, {
        erro: "O conteúdo deve ter entre 1 e 12000 caracteres."
      });
    }

    if (
      typeof tipo !== "string" ||
      !["perfil", "portfolio", "mensagem"].includes(tipo)
    ) {
      return responder(res, 400, {
        erro: "Tipo de conteúdo inválido."
      });
    }

    if (contemCredencial(conteudo)) {
      return responder(res, 200, {
        status: STATUS.BLOQUEADO,
        motivo: "O conteúdo parece conter uma senha ou credencial privada."
      });
    }

    const resultado = await executarLangflow(conteudo, tipo);

    return responder(res, 200, resultado);
  } catch (erro) {
    console.error("Falha na análise de conteúdo:", erro.message);

    return responder(res, 500, {
      status: STATUS.REVISAR,
      erro: "Não foi possível concluir a análise. Tente novamente."
    });
  }
}
