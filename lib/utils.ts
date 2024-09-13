// import nodemailer from "nodemailer";


// export async function sendMail({ email, emailType, userId }: any) {
//   try {

//     const transporter = nodemailer.createTransport({
//       host: "",
//       port: 586,
//       secure: false,
//       auth: {
//         user: "",
//         pass: "",
//       },
//     });

//     const mailResponse = await transporter.sendMail({
//       from: "", // sender address
//       to: email, // reciever address
//       subject:
//         emailType === "verify" ? "Verify your email" : "Reset your password", // Subject Line
//       html: "<b>Hello World</b>", // html body
//     });
//     console.log(mailResponse);
//     return mailResponse;
//   } catch (error) {
//     console.log(error);
//     // throw new Error(error);
//   }
// }
