import axios from './root.service.js';

export async function enviarMail(email, subject, message) {
      
    try {
        //console.log("Enviando correo a:", subject);
        const data = await axios.post('/email/send', {
            email,
            subject,
            message
        });
        return data;

    } catch (error) {
        //console.log(error);
        return error;
    }
}

