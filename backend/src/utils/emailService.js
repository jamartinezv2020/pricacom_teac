import nodemailer from "nodemailer";
export const sendValidationEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const validationLink = `${process.env.BASE_URL}/api/auth/validate/${email}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Por favor, valida tu cuenta",
        text: `Haz clic en este enlace para validar tu cuenta: ${validationLink}`
    };
    await transporter.sendMail(mailOptions);
};
