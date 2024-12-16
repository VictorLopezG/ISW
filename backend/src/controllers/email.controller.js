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
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e5d174;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .header {
            background-color: #e5d174;
            color: #000;
            text-align: center;
            padding: 20px;
            font-size: 2em;
            font-weight: bold;
            border-radius: 20px 20px 0 0;
            margin-bottom: 0;
        }

        .container {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            text-align: center;
        }

        .title {
            text-align: center;
            font-size: 1.5em;
            font-weight: bold;
            margin: 20px 0;
            color: #333;
        }

        .table-container {
            width: 100%;
        }

        table {
            width: 60%; /* Reduce el tamaño de la tabla */
            margin: 20px auto; /* Centra la tabla */
            border-collapse: collapse;
        }

        thead tr {
            background-color: #768AE5;
            color: #fff;
            text-align: center;
        }

        th, td {
            padding: 12px 15px;
            border: 1px solid #ddd;
            text-align: center;
        }

        tbody tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tbody tr:hover {
            background-color: #d9e6ff;
        }

        p {
            font-size: 1.2em;
            font-weight: bold;
            margin: 0;
            padding: 15px;
            text-align: right;
            color: #4a73e8;
            background-color: #f9f9f9;
            border-top: 1px solid #ddd;
        }

    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ISW
        </div>
        <div class="title">
            ¡Gracias por comprar en Ingeniería de Software!
        </div>
        <div class="table-container">
            <table>
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
        </div>
        <p>Total: <span style="font-weight: bold;">$${total}</span></p>
    </div>
</body>
</html>









        `;

        const info = await sendEmail(email, subject,"dasd" ,htmlMessage);

        handleSuccess(res, 200, "Correo enviado con éxito.", info);
    } catch (error) {
        console.error("Error al procesar el correo:", error);
        handleErrorServer(res, 500, "Error al enviar el correo en controller", error.message);
    }
};