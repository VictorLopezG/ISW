import axios from './root.service.js';

export async function enviarMail(email, subject, message) {
      
    try {
        const data = await axios.post('/email/send', {
            email,
            subject,
            message
        });
        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}

