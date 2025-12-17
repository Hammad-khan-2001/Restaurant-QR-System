import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "riteshpatidar088@gmail.com",      // your gmail
    pass: 'gaee jvfa mele ukmu'       // app password
  }
});

export const sendWelcomeMail = async (to, name) => {
  await transporter.sendMail({
    from: `"ScanBite 🍽️" <${process.env.EMAIL_USER}>`,
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
};
