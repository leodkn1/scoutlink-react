# 🎮 ScoutLink

> Conectando talentos aos grandes palcos do eSports.

## 📌 Sobre o projeto

O ScoutLink é uma plataforma desenvolvida para aproximar jogadores, talentos e organizações do cenário competitivo de eSports.

A proposta é facilitar a descoberta de novos talentos, permitir que jogadores apresentem suas experiências e conquistas e oferecer às organizações uma forma mais prática de encontrar perfis com potencial competitivo.

O projeto foi desenvolvido como parte das atividades acadêmicas da FIAP, com foco em tecnologia, inovação, acessibilidade e segurança da informação.

---

## 🎯 Objetivo

O ScoutLink busca criar uma conexão entre jogadores e organizações do cenário competitivo.

A plataforma permite que jogadores criem seus próprios perfis profissionais, apresentem suas experiências e construam um portfólio com seus principais trabalhos e momentos competitivos.

A plataforma também possui recursos voltados para organizações, permitindo a busca e visualização de talentos cadastrados.

---

## 🚀 Funcionalidades

### 👤 Conta e autenticação

- [x] Cadastro de usuários
- [x] Login com e-mail e senha
- [x] Logout
- [x] Autenticação utilizando Firebase Authentication
- [x] Identificação automática do usuário autenticado
- [x] Proteção das áreas relacionadas ao perfil

### 👨‍💻 Perfil do jogador

- [x] Visualização do perfil
- [x] Edição do perfil na própria página
- [x] Nome
- [x] Nickname
- [x] Foto de perfil através de URL
- [x] Jogo principal
- [x] Rank
- [x] Cidade/região
- [x] Função dentro do jogo
- [x] Biografia
- [x] Horas jogadas
- [x] Estatísticas
- [x] Disponibilidade
- [x] Times anteriores
- [x] Conquistas
- [x] Redes sociais

### 🏆 Portfólio

- [x] Página de portfólio
- [x] Cadastro de materiais
- [x] Título do material
- [x] Jogo relacionado
- [x] Descrição
- [x] URL de vídeo
- [x] URL de imagem
- [x] Edição de materiais
- [x] Exclusão de materiais
- [x] Armazenamento dos dados no Firestore

### 🔎 Talentos

- [x] Listagem de talentos
- [x] Visualização de informações dos jogadores
- [x] Busca de talentos
- [x] Visualização de perfil completo
- [x] Acesso ao portfólio dos talentos

### 🏢 Organizações

- [x] Página de organizações
- [x] Busca por talentos
- [x] Pesquisa por nome
- [x] Pesquisa por nickname
- [x] Pesquisa por jogo
- [x] Pesquisa por rank
- [x] Pesquisa por função
- [x] Pesquisa por região
- [x] Acesso aos perfis dos talentos

### 🎮 Outras funcionalidades

- [x] Página inicial
- [x] Página de jogos
- [x] Página sobre o projeto
- [x] Dashboard de talentos
- [x] Navegação entre páginas
- [x] Interface responsiva
- [x] Integração com banco de dados
- [x] Regras de segurança do Firestore

---

## 🔐 Segurança

A segurança dos dados dos jogadores é uma das prioridades do ScoutLink.

O sistema utiliza o Firebase Authentication para realizar o gerenciamento de contas e autenticação dos usuários.

As senhas dos usuários não são armazenadas diretamente no Firestore. O gerenciamento das credenciais é realizado pelo Firebase Authentication.

Os dados complementares dos jogadores são armazenados no Cloud Firestore.

As regras de segurança do Firestore controlam o acesso aos dados de cada usuário, permitindo que um jogador altere somente as informações pertencentes à sua própria conta.

### Principais medidas utilizadas

- Firebase Authentication
- Autenticação por e-mail e senha
- Identificação por UID
- Regras de segurança do Firestore
- Separação entre autenticação e dados de perfil
- Controle de acesso aos documentos do usuário
- Controle de acesso ao portfólio do usuário

---

## 🗄️ Estrutura dos dados

Os dados dos jogadores são armazenados no Firestore seguindo uma estrutura baseada no UID do usuário.

```text
users/
└── UID_DO_USUARIO/
    ├── nome
    ├── email
    ├── nickname
    ├── foto
    ├── jogoPrincipal
    ├── rank
    ├── cidade
    ├── bio
    ├── funcao
    ├── timesAnteriores
    ├── conquistas
    ├── redesSociais
    ├── estatisticas
    ├── horasJogo
    └── disponibilidade

    portfolio/
    └── ID_DO_MATERIAL/
        ├── titulo
        ├── jogo
        ├── descricao
        ├── videoUrl
        ├── imagemUrl
        ├── criadoEm
        └── atualizadoEm