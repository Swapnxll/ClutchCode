import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,

    auth: {
      user: process.env.Gmail,
      pass: process.env.password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(to right, #7b68ee, #6a5acd);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      background-color: #ffffff;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    h1 {
      color: #6a5acd;
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #555;
      margin-bottom: 20px;
    }

    .otp {
      font-size: 40px;
      font-weight: 600;
      color: #ff4500;
      letter-spacing: 6px;
      margin: 20px 0;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Hello <strong>${data.name}</strong>,</p>
    <p>Your One-Time Password (OTP) for account verification is:</p>
    <div class="otp">${data.otp}</div>
    <p>Please use this OTP within the next 10 minutes.</p>
    <div class="footer">If you did not request this, please ignore this email.</div>
  </div>
</body>
</html>`;

  await transport.sendMail({
    from: `"ClutchCode" ${process.env.Gmail}`,
    to: email,
    subject,
    html,
  });
};
export default sendMail;
