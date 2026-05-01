import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

export const sendWhatsApp = async ({ to, name, date, time, token }) => {
  try {
    const message = `Hello ${name},

Your appointment is confirmed ✅

📅 ${date}
⏰ ${time}
🎫 Token: ${token}

Please arrive 10 minutes early.

– Nayan Drishti Clinic`;

    const res = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${to}`,
      body: message,
    });

    console.log("WhatsApp sent:", res.sid);
  } catch (err) {
    console.error("WhatsApp Error:", err.message);
  }
};