import axios from './root.service.js';

export async function createPedido(data) {
    try {
        const { descripcion,IDmesa,total } = data;
        const response = await axios.post('/ped/:createP', {
            descripcion:descripcion,
            total:1,
            estado:'Pendiente',
            mesaID:IDmesa
        });
        console.log(response.data);
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
        const response = await axios.put(`/ped/${id}`, data);
        console.log(response.data);
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