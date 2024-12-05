import axios from "./root.service.js";

export async function getPedidosListo() {
    try {
        const response = await axios.get("/tabla/listo");
        return response.data;
    } catch (error) {
        console.error("Error en getCajaCobro:", error);
        return error.response.data;
    }
}