"use strict";
import { sendEmail } from '../services/email.service.js';

import {
    handleErrorServer,
    handleSuccess
} from '../handlers/responseHandlers.js';

export const sendCustomEmail = async (req, res) => {
    console.log(req.body);
    const { email, subject, message } = req.body;

    console.log("email controller", email);
    console.log("subject controller", subject);
    console.log("message controller", message);

    try {
        // Separar el JSON de los pedidos y el total
        const [pedidosJson, totalLine] = message.split('Total: $');
        const pedidos = JSON.parse(pedidosJson);
        const total = parseInt(totalLine, 10);

        // Construir las filas de la tabla con los datos
        const messageRows = pedidos.map(pedido => {
            return `
                <tr>
                    <td>${pedido.producto}</td>
                    <td>${pedido.cantidad}</td>
                    <td>${pedido.valor}</td>
                </tr>
            `;
        }).join('');

        // Generar el HTML de la tabla
        const htmlMessage = `
            <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${messageRows}
                </tbody>
            </table>
            <p><strong>Total: $${total}</strong></p>
        `;

        const info = await sendEmail(email, subject,"dasd" ,htmlMessage);

        handleSuccess(res, 200, "Correo enviado con éxito.", info);
    } catch (error) {
        console.error("Error al procesar el correo:", error);
        handleErrorServer(res, 500, "Error al enviar el correo en controller", error.message);
    }
};