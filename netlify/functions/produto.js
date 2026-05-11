const TOKEN = process.env.SEFAZ_APP_TOKEN;
const API_URL = 'http://api.sefaz.al.gov.br/sfz-economiza-alagoas-api/api/public/produto/pesquisa';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!TOKEN) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Variavel de ambiente SEFAZ_APP_TOKEN nao configurada.' }),
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AppToken': TOKEN,
      },
      body: event.body,
    });

    const text = await response.text();

    if (!text || !text.trim()) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'A API da SEFAZ/AL retornou uma resposta vazia. Tente novamente mais tarde.' }),
      };
    }

    return {
      statusCode: response.status,
      headers: CORS_HEADERS,
      body: text,
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Erro ao conectar com a API da SEFAZ/AL. Tente novamente.',
        detail: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};