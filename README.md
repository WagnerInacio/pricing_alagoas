# 💰 Price Alagoas

Comparador de preços de **produtos** e **combustíveis** em Alagoas, com dados reais extraídos das Notas Fiscais Eletrônicas (NF-e) — via API pública **Economiza Alagoas** da SEFAZ/AL.

![Preview](https://img.shields.io/badge/status-ativo-brightgreen) ![Netlify](https://img.shields.io/badge/deploy-Netlify-00C7B7?logo=netlify) ![License](https://img.shields.io/badge/licença-MIT-blue)

---

## ✨ Funcionalidades

- 🔍 **Busca de produtos** por descrição — ordena do mais barato ao mais caro
- ⛽ **Busca de combustíveis** — Gasolina Comum/Aditivada, Álcool, Diesel Comum/S10 e GNV
- 📍 **3 modos de localização:**
  - **Cidade** — todos os 102 municípios alagoanos
  - **GPS** — localização automática com raio ajustável (1–15 km)
  - **CNPJ** — consulta por estabelecimento específico
- 📅 Período de busca configurável (1–10 dias)
- 🏷️ Cards com badge **"Mais barato"**, barra de preço colorida, endereço, telefone e data
- 📄 Paginação completa dos resultados

---

## 🗂️ Estrutura do projeto

```
price-alagoas/
├── index.html                     # Frontend (HTML/CSS/JS puro)
├── netlify.toml                   # Configuração de build e redirects
├── .env.example                   # Exemplo de variáveis de ambiente
├── .gitignore
└── netlify/
    └── functions/
        ├── produto.js             # Proxy serverless → endpoint de produtos
        └── combustivel.js         # Proxy serverless → endpoint de combustíveis
```

> **Por que Netlify Functions?**
> A API da SEFAZ/AL usa HTTP (não HTTPS). Navegadores modernos bloqueiam requisições mistas (HTTPS → HTTP). As Functions atuam como proxy seguro no servidor, contornando essa limitação sem expor o token no frontend.

---

## 🚀 Deploy no Netlify

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/price-alagoas.git
cd price-alagoas
```

### 2. Configure a variável de ambiente

No painel do Netlify, vá em **Site configuration → Environment variables** e adicione:

| Variável          | Valor                        |
|-------------------|------------------------------|
| `SEFAZ_APP_TOKEN` | `seu_token_da_sefaz_al`      |

> ⚠️ **Nunca** coloque o token diretamente no código ou no repositório.  
> Obtenha seu token em: [sefaz.al.gov.br](https://www.sefaz.al.gov.br/nfe/economiza-alagoas)

### 3. Conecte ao GitHub e faça o deploy

1. No [Netlify](https://app.netlify.com), clique em **Add new site → Import from Git**
2. Selecione este repositório
3. As configurações de build já estão no `netlify.toml` — não é necessário alterar nada
4. Clique em **Deploy site**

### Deploy local (desenvolvimento)

```bash
# Instale a CLI do Netlify
npm install -g netlify-cli

# Crie o arquivo .env a partir do exemplo
cp .env.example .env
# Edite .env e adicione seu token

# Inicie o servidor local
netlify dev
```

O site estará disponível em `http://localhost:8888`.

---

## 🔧 Variáveis de ambiente

| Variável          | Descrição                                      | Obrigatório |
|-------------------|------------------------------------------------|-------------|
| `SEFAZ_APP_TOKEN` | Token de autenticação da API Economiza Alagoas | ✅ Sim       |

---

## 🌐 API utilizada

**Economiza Alagoas — SEFAZ/AL**

| Campo        | Valor                                                          |
|--------------|----------------------------------------------------------------|
| Base URL     | `http://api.sefaz.al.gov.br/sfz-economiza-alagoas-api/api/public/` |
| Autenticação | Header `AppToken`                                              |
| Método       | `POST` com corpo JSON                                          |
| Endpoints    | `/produto/pesquisa` e `/combustivel/pesquisa`                  |
| Registros    | Até 5.000 por página                                           |

---

## 🛡️ Segurança

- O token da API **nunca** é exposto no frontend
- Toda comunicação com a SEFAZ/AL ocorre exclusivamente nas Netlify Functions (servidor)
- O arquivo `.env` está no `.gitignore` e não é versionado
- Use o arquivo `.env.example` como referência — ele não contém valores sensíveis

---

## 📄 Licença

MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m 'feat: minha nova feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

> Dados fornecidos pela **SEFAZ/AL** via API Economiza Alagoas. As informações refletem os preços registrados nas NF-e e podem apresentar variações em relação aos valores praticados no momento da consulta.