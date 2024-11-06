import axios from './root.service.js';

export async function createPedido(data) {
    try {
        const { descripcion,total,estado } = data;
        const response = await axios.post('/ped/:createP', {
            descripcion,
            total,
            estado,
            mesaID
        });
        
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getPedidos() {
    try {
        const { data } = await axios.get('/ped/all');
     
        return data;

    } catch (error) {
        return error.response.data;
    }
}

export async function updatePedido(data, id) {
    try {
        const response = await axios.put(`/ped/:id/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deletePedido(id) {
    try {
        const response = await axios.delete(`/ped/:id/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}