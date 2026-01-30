import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

interface SendEmailOptions {
  email: string;
  subject: string;
  mailgenContent: Mailgen.Content;
}

const sendEmail = async (options: SendEmailOptions) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Taskora",
      link: process.env.BASE_URL || "http://localhost:3000",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transportOption: SMTPTransport.Options = {
    host: process.env.MAILTRAP_SMTP_HOST,
    port: Number(process.env.MAILTRAP_SMTP_PORT),
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  };

  const transporter = nodemailer.createTransport(transportOption);

  const mail = {
    from: "mail.taskora@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed siliently. Make sure that you have provided your MailTRAP credentauls in environmental varibles file",
    );
    console.error("Error: ", error);
  }
};

// Templates

const emailVerificationMailgenContent = (
  username: string,
  verificationUrl: string,
) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we'are excited to have you on board",
      action: {
        instructions:
          "To verify you email please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have question? just reply to this email, we'd love to help",
    },
  };
};

const forgotPasswordMailgenContent = (
  username: string,
  passwordResetUrl: string,
) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset a password of your account",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#c74821",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have question? just reply to this email, we'd love to help",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
