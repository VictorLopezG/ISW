import axios from "./root.service.js";

export async function getSolicitudes() {
    console.log("entro a cocinaConsulta.service.js");

    try {
        console.log("entrara a axios de cocina");

        const response = await axios.get("/tabla/all");
        console.log("response.data", response.data);
    
        return response.data;

    } catch (error) {
        console.log("Error en cocinaConsulta.service.js");
        console.log(error);
        return error.response.data;

    }
}

