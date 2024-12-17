import axios from './root.service.js';

export async function crearMesa(datamesa) {
    try {
        const { descripcion , capacidad} = datamesa;
        const response = await axios.post('/mesa/createM', {
            descripcion: descripcion,
            capacidad: capacidad,
        })
        return response.data;
    }
    catch (error) {
        return error.response.data.details.message;
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
        const response = await axios.put(`/mesa/${id}`, data);
        //console.log(response);
        return  [response.data,response.data.data];
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteMesa(id) {
    try {
        const response = await axios.delete(`/mesa/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
