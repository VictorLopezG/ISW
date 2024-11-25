import axios from './root.service.js';

export async function createSolicitud(data) {
    try {
        const { id_Pedido,id_Producto,cantidad, estado} = data;
        const response = await axios.post('/sol/create', {
            id_Pedido:id_Pedido,
            id_Producto:id_Producto,
            cantidad:cantidad,
            estado:estado
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getSolicitudes() {
    try {
        const { data } = await axios.get('/sol/all');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateSolicitud(data, id) {
    try {
        const response = await axios.put(`/sol/${id}`, data);
        console.log(response.data);
        return response.data.data;
    } catch (error) {

        console.log(error);
        return error.response.data;
    }
}

export async function deleteSolicitud(id) {
    try {
        const response = await axios.delete(`/sol/:id/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}