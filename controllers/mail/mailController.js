const { sendMail } = require("../../services/mailService");

exports.createMail = async (req, res) => {
  console.log("📥 Requisição recebida para envio de e-mail.");
  try {
    console.log("📨 Mensagem recebida do body:", req.body);

    if (!req.body.message) {
      console.warn("⚠️ Mensagem ausente no corpo da requisição.");
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }
    let mensagem = req.body.message;
    const messageId = await sendMail({ mensagem });

    console.log("✅ E-mail enviado com sucesso. ID:", messageId);

    return res.status(200).json({ success: true, messageId });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return res
      .status(500)
      .json({ success: false, error: "Erro ao enviar e-mail." });
  }
};
