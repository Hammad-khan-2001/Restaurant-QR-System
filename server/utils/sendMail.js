import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "riteshpatidar088@gmail.com",      // your gmail
    pass: 'gaee jvfa mele ukmu'       // app password
  }
});

export const sendWelcomeMail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: "riteshpatidar088@gmail.com",
      to: "onea4427@gmail.com",
      subject: "Thank you for registering on ScanBite 🎉",
      html: `
      <div style="font-family: Arial;">
        <h2>Hello ${name} 👋</h2>
        <p>Thank you for registering with <b>ScanBite</b>.</p>
        <p>You can now scan QR, place orders & track them easily.</p>
        <br/>
        <p>🍔 Happy Ordering!</p>
        <p><b>Team ScanBite</b></p>
      </div>
    `
    });
    console.log("✅ Mail sent successfully");
  } catch (error) {
    console.error("❌ Mail error:", error);
  }
};
