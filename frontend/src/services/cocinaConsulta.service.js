import axios from "./root.service.js";

export async function getSolicitudes() {
    try {
        const response = await axios.get("/tabla/all");
        return response.data;
    } catch (error) {
        //console.log("Error en cocinaConsulta.service.js");
        //console.log(error);
        return error.response.data;

    }
}

export async function getconsumo(id_pedido){
    try {
        //console.log(id_pedido);
        const response = await axios.get(`/tabla/consumo/${id_pedido}`);
        return response.data;
    } catch (error) {
        //console.log("Error en cocinaConsulta.service.js");
        return error.response.data;
    }

}
