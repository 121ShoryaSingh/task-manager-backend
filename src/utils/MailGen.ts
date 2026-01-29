import Mailgen from "mailgen";

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

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
