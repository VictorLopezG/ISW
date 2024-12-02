import { getTablaDatosService } from "../services/tabla.service.js";

export const getTablaDatos = async (req, res) => {
    try {
        
        const data = await getTablaDatosService(); 

        return res.json(data); 
    } catch (error) {
        console.error("Erroraaaaaaaaaa", error);
        return res.status(500).json({ message: "Error al obteneraa  datos" });
    }
};