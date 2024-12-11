import nodeMailer from 'nodemailer';
import { emailConfig } from '../config/configEnv.js';


export const sendEmail = async (to, subject, text, html) => {

    try {
        const transporter = nodeMailer.createTransport({
            service: emailConfig.service,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass
            }
        });

        const mailOptions = {
            from: `"Ingenieria de Software Grupo 10" <${emailConfig.user}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        };
        await transporter.sendMail(mailOptions);
        return mailOptions
    
        
    } catch (error) {
        console.error("Error al enviar el correo en service %s", error.message);
        throw new Error("Error al enviar el correo en service"+ error.message);
    }
}