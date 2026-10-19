
import { auth } from './firebase'

export async function analisarConteudo(content, tipo) {
  const usuario = auth.currentUser

  if (!usuario) {
    throw new Error('Você precisa entrar na sua conta para continuar.')
  }

  const token = await usuario.getIdToken()

  const resposta = await fetch('/api/analisar-conteudo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      content,
      tipo
    })
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(
      dados.erro || 'Não foi possível analisar o conteúdo.'
    )
  }

  return dados
}
