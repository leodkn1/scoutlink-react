
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import analisarConteudo from './api/analisar-conteudo.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'scoutlink-api-local',
        configureServer(server) {
          Object.assign(process.env, env)

          server.middlewares.use('/api/analisar-conteudo', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Allow', 'POST')
              res.end(JSON.stringify({ erro: 'Método não permitido.' }))
              return
            }

            try {
              const partes = []

              for await (const parte of req) {
                partes.push(parte)
              }

              req.body = JSON.parse(Buffer.concat(partes).toString('utf8') || '{}')

              const resposta = {
                status(codigo) {
                  res.statusCode = codigo
                  return this
                },
                json(dados) {
                  res.setHeader('Content-Type', 'application/json; charset=utf-8')
                  res.end(JSON.stringify(dados))
                },
                setHeader(nome, valor) {
                  res.setHeader(nome, valor)
                }
              }

              await analisarConteudo(req, resposta)
            } catch {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
              res.end(JSON.stringify({ erro: 'Requisição inválida.' }))
            }
          })
        }
      }
    ]
  }
})
