// middlewares/corsMiddleware.js
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:8081",
  "https://preview--revan-imobiliaria-web.lovable.app",
  "https://revan-imobiliaria-web.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permite requisições sem origin (Postman, cURL)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204, // responde OPTIONS com 204
};

module.exports = cors(corsOptions);
