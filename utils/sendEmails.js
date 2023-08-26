const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmails = async (data) => {
  try {
    const { email, otp } = data;
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Social Media App" <socialmediaapp@gmail.com>',
      to: email,
      subject: "OTP Verification",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>OTP Verification</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
      
            .container {
              padding: 20px;
              background-color: #f5f5f5;
            }
      
            .header {
              background-color: #007bff;
              padding: 20px;
              color: #fff;
              text-align: center;
            }
      
            .content {
              margin-top: 20px;
              padding: 20px;
              background-color: #fff;
              border-radius: 4px;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
      
            .footer {
              text-align: center;
              margin-top: 20px;
              padding: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OTP Verification</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>Your account Verification OTP is <strong>${otp}</strong>.</p>
              <p>
                Please use this OTP to verify your account.
              </p>
            </div>
            <div class="footer">
              <p>If you have any questions, contact our support team.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });

    return info;
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { sendEmails };
