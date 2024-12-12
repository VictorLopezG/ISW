import axios from "axios";

export async function enviarMail(email, subject, message) {
      
    try {
        const data = await axios.post('http://localhost:3000/api/email/send', {
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

