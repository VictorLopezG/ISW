import { get } from "lodash";
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

export async function getVentasTotal() {
    try {
        const response = await axios.get("/tabla/ventas");
        return response.data;
    } catch (error) {
        console.log("Error en cocinaConsulta.service.js");
        console.log(error);
        return error.response.data;

    }
}

export async function getVentasAnual(data) {
    try {
        const response = await axios.get(`/tabla/anual/${data}`);
        return response.data;
    } catch (error) {
        console.log("Error en cocinaConsulta.service.js");
        console.log(error);
        return error.response.data;

    }
}

export async function getVentasProductos() {
    try {
        const response = await axios.get("/tabla/productos");
        return response.data;
    } catch (error) {
        console.log("Error en cocinaConsulta.service.js");
        console.log(error);
        return error.response.data;

    }
}

export async function getPeriodoService() {
    try {
    
        const response = await axios.get(`/tabla/periodo`);
        return response.data;
    } catch (error) {
        console.log("Error en cocinaConsulta.service.js");
        console.log(error);
        return error.response.data;

    }
}
