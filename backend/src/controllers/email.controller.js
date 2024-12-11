"use strict";
import {sendEmail} from '../services/email.service.js';

import{
    handleErrorServer,
    handleSuccess
} from '../handlers/responseHandlers.js';

export const sendCustomEmail = async (req, res) => {
    console.log(req.body);
    const {email, subject, message} = req.body;

    console.log("email controller", email);
    console.log("subject controller", subject);
    console.log("message controller", message);
    try {
        const info = await sendEmail(email, subject, message, `<p>${message}</p>`);

        handleSuccess(res, 200, "correo enviado con exito.", info);
        
    } catch (error) {
        handleErrorServer(res,500,"Error al enviar el correo en controller", error.message);
        
    }
};