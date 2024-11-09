import axios from './root.service.js';

export async function createProducto(data) {
    try {
        const { nombre,valor,stock } = data;
        const response = await axios.post('/ped/:createP', {
            nombre:nombre,valor:valor,stock:stock
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getProductos() {
    try {
        const { data } = await axios.get('/producto/all/');
        //console.log(data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateProducto(data, id) {
    try {
        const response = await axios.put(`/producto/${id}`, data);
        console.log(response.data);
        return response.data.data;
    } catch (error) {

        console.log(error);
        return error.response.data;
    }
}

export async function deleteproducto(id) {
    try {
        const response = await axios.delete(`/producto/:id/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}