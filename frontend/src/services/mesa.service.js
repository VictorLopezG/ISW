import cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { convertirMinusculas } from '@helpers/formatData.js';
import axios from 'axios';

export async function crearMesa(datamesa) {
    try {
        const estado=convertirMinusculas(estado);
        const descripcion=convertirMinusculas(descripcion);
        const response = await axios.post('/mesa/createM', {
            numero: datamesa.numero,
            capacidad: datamesa.capacidad,
            estado: datamesa.estado,
            descripcion: datamesa.descripcion
        })
        return response.data;
    }
    catch (error) {
        return error.response.data;
    }
}


