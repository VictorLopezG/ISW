import {
    getTablaDatosService,
    getPedidoListoService
} from "../services/tabla.service.js";

export const getTablaDatos = async (req, res) => {
    try {

        const data = await getTablaDatosService();

        return res.json(data);
    } catch (error) {
        console.error("Erroraaaaaaaaaa", error);
        return res.status(500).json({ message: "Error al obteneraa  datos" });
    }
};

export const getPedidoListo = async (req, res) => {
    try {
        const data = await getPedidoListoService();
        return res.json(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}