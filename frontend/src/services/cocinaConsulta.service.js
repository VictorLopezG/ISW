import axios from "./root.service.js";

export async function getSolicitudes() {


    try {
       ;

        const response = await axios.get("/tabla/all");
        
    
        return response.data;

    } catch (error) {
        console.log("Error en cocinaConsulta.service.js");
        console.log(error);
        return error.response.data;

    }
}

