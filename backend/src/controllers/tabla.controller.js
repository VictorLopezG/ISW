import {
    getTablaDatosService,
    getPedidoListoService,
    getconsumoService,
    getVentasTotalService,
    getVentasAnualService,
    getVentasProductosService,
    getPeriodoService,
    getDiasRankingService
} from "../services/tabla.service.js";

export const getTablaDatos = async (req, res) => {
    try {

        const data = await getTablaDatosService();

        return res.json(data);
    } catch (error) {
        console.error("error en getTablaDatos controller", error);
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

export const getconsumo = async (req, res) => {
    try {
        const data = await getconsumoService(req.params.id_pedido);
        return res.json(data);

    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}

export const getVentasTotal = async (req, res) => {
    try {
 
        
        const data = await getVentasTotalService();
      
        return res.json(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}


export const getVentasAnual = async (req, res) => {
    try {
        const date = req.params.date
   
  
        const data = await getVentasAnualService(date);
        return res.json(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}

export const getVentasProductos = async (req, res) => {
    try {
        const data = await getVentasProductosService();
        return res.json(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}

export const getPeriodo = async (req, res) => {
    try {
        const data = await getPeriodoService();
        return res.json(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}

export const getDiasRanking = async (req, res) => {
    try {
        const data = await getDiasRankingService();
        return res.json(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
        return res.status(500).json({ message: "Error al obtener los datos" });
    }
}