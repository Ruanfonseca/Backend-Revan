const allowedOrigins = [
  "http://localhost:8080",
  "https://preview--revan-imobiliaria-web.lovable.app",
  // Adicione outras URLs permitidas aqui
];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Responde OPTIONS diretamente
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};

module.exports = corsMiddleware;
