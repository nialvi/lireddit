import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log({ testAccount });

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "ut362crfiabwm5xv@ethereal.email", // generated ethereal user
      pass: "cdQjA8Aa6E4NX319MB", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"No Name 👻" <foo@example.com>',
    to,
    subject: "Hi ✔",
    html,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
