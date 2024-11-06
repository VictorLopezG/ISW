import axios from './root.service.js';

export async function createMesa(data) {
    try {
        const { descripcion,capacidad } = data;
        const response = await axios.post('/mesa/createM', {
            descripcion,
            capacidad,
        });
        
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getMesas() {
    try {
        const { data } = await axios.get('/mesa/all');
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateMesa(data, id) {
    try {
        const response = await axios.put(`/mesa/:id/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteMesa(id) {
    try {
        const response = await axios.delete(`/mesa/:id/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}