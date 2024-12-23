import axios from './root.service.js';
import { convertirMinusculas } from '@helpers/formatData.js';

export async function createProducto(data) {
    try {

        const dataRegister = convertirMinusculas(data);
        const { nombre,valor,stock, categoria} = dataRegister;
        const response = await axios.post('/producto/crearProducto', {
            nombre:nombre,
            valor:valor,
            stock:stock,
            categoria:categoria

        });
        return response.data;
    } catch (error) {
        return error.response.data.message.message;
    }
}

export async function getProductos() {
    try {
        const { data } = await axios.get('/producto/all/');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getProducto(id) {
    try {
        const response = await axios.get(`/producto/${id}`);
        //console.log(response.data);
        return response.data.data;
    } catch (error) {

        //console.log(error);
        return error.response.data;
    }
}

export async function updateProducto(data, id) {
    try {
        convertirMinusculas(data);
        const response = await axios.put(`/producto/${id}`, data);
        //console.log("data",response.data);
        return  [response.data,response.data.data];
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteproducto(id) {
    try {
        const response = await axios.delete(`/producto/eliminarProductoID/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}