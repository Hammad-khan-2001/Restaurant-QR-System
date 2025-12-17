import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",      // your gmail
    pass: ""       // app password
  }
});

export const sendWelcomeMail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: "",
      to: "",
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
