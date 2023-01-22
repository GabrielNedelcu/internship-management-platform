const mailer = require("../config/mailer.config");

/**
 * Send email using the sendgrid api
 *
 * @param {Object} mail       - The mail to be sent
 */
async function sendMail(mail) {
  try {
    mailer.send(mail);
  } catch (err) {
    logger.error(err);

    const error = new Error(err.response.body || "Could not send mail");
    throw error;
  }
}

/**
 * Send an email for the password reset action
 *
 * @param {String}  email            - The email of the user we want to send the email to
 * @param {String}  password         - The new generated password
 * @param {String}  confirmationUrl  - The url needed for confirming the action
 */
async function sendPasswordResetMail(email, confirmationUrl) {
  const mail = {
    to: email,
    from: {
      email: "agn3141@gmail.com",
      name: "ETTI Internships",
    },
    subject: "Password reset",
    templateId: "d-241f441584db4c5a9b4628d5f4e70117",
    dynamicTemplateData: {
      email: email,
      "url-redirect": confirmationUrl,
    },
  };

  await sendMail(mail);
}

/**
 * Send an email after the password was successfully reset
 *
 * @param {String}  email            - The email of the user we want to send the email to
 * @param {String}  password         - The new generated password
 * @param {String}  confirmationUrl  - The url needed for confirming the action
 */
async function sendPasswordResetSuccessMail(email, password) {
  console.log(email);
  const mail = {
    to: email,
    from: {
      email: "agn3141@gmail.com",
      name: "ETTI Internships",
    },
    templateId: "d-2b9e45004b3b40faabfe0cbca0987d63",
    dynamicTemplateData: {
      email: email,
      password: password,
    },
  };

  await sendMail(mail);
}

module.exports = {
  sendPasswordResetMail,
  sendPasswordResetSuccessMail,
};
