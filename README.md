# Guia de Configuração e Execução do Projeto Front-End

Este guia fornece instruções passo a passo para configurar e executar a aplicação front-end localmente.

---

## **Pré-requisitos**

Antes de executar o projeto, certifique-se de que você tem os seguintes itens instalados:

- **Node.js** (versão 16 ou superior). Você pode baixá-lo no [site oficial do Node.js](https://nodejs.org/).
- **npm** (vem junto com o Node.js) ou **yarn** (instale com o comando `npm install -g yarn`).
- **Git**. Você pode baixá-lo no [site oficial do Git](https://git-scm.com/).

---

## **Passos de Instalação**

1. Clone o repositório:

   - Use o Git para clonar o repositório do projeto: `git clone <url-do-repositorio>` (substitua `<url-do-repositorio>` pela URL real do repositório).

2. Navegue até o diretório do projeto:

   - Use o comando: `cd <nome-da-pasta-do-projeto>` (substitua `<nome-da-pasta-do-projeto>` pelo nome da pasta criada após o clone).

3. Instale as dependências:
   - Se estiver usando npm: `npm install`.
   - Se estiver usando yarn: `yarn install`.

---

## **Configuração do Ambiente**

1. Crie um arquivo `.env`:

   - No diretório raiz do projeto, crie um arquivo chamado `.env`.

2. Adicione as variáveis de ambiente necessárias:
   - Adicione o seguinte conteúdo ao arquivo `.env`:  
     `VITE_APP_API_BASE_URL=http://localhost:5000`  
     Substitua `http://localhost:5000` pela URL do seu servidor de API, se for diferente.

---

## **Executar a Aplicação**

1. Inicie o servidor de desenvolvimento:

   - Se estiver usando npm: `npm run dev`.
   - Se estiver usando yarn: `yarn dev`.

2. Acesse a aplicação:
   - Abra o navegador e vá para `http://localhost:5173`.

---

## **Scripts Disponíveis**

Aqui estão os scripts comuns que você pode usar no projeto:

- `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento.
- `npm run build` ou `yarn build`: Cria a versão de produção da aplicação.
- `npm run preview` ou `yarn preview`: Visualiza a versão de produção localmente.
- `npm run lint` ou `yarn lint`: Executa o linter de código para identificar problemas de sintaxe ou formatação.

---
