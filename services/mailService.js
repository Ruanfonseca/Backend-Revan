const { Resend } = require("resend");

const resend = new Resend("re_BTMaZCgE_B9PFzHSx8Rc5keL2Gzq8EL5p");

async function sendMail({ mensagem }) {
  console.log("🔄 Enviando e-mail via Resend...");

  try {
    const { data, error } = await resend.emails.send({
      from: "Plataforma Revan Imobiliária <contato@revan.app>",
      to: ["quedsoft@gmail.com"],
      subject: "NewsLetter",
      text: mensagem,
    });

    if (error) {
      console.error("❌ Erro ao enviar:", error);
      throw error;
    }

    console.log("✅ E-mail enviado com ID:", data.id);
    return data.id;
  } catch (err) {
    console.error("❌ Falha no envio:", err);
    throw err;
  }
}

module.exports = { sendMail };
