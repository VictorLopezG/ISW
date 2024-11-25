import { getTablaDatosService } from "../services/tabla.service.js";

export const getTablaDatos = async (req, res) => {
    try {
        console.log("Obteniendo datos de la tabla..."); // Mensaje para el servidor
        const data = await getTablaDatosService(); 

        return res.json(data); // Enviamos el resultado al cliente
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return res.status(500).json({ message: "Error al obteneraa  datos" });
    }
};