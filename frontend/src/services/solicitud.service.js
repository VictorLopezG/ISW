import axios from './root.service.js';

export async function createSolicitud(data) {
    //console.log(data);
    try {
        const { id_Pedido,id_Producto,cantidad, estado} = data;
        const response = await axios.post('/sol/create', {
            id_Pedido:id_Pedido,
            id_Producto:id_Producto,
            cantidad:cantidad,
            estado:estado
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getSolicitudesByPedido(id_Pedido){
    try {
        const response = await axios.get(
            `/sol/?&id_Pedido=${id_Pedido}`);
        //console.log(response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getSolicitud(data) {
    const {id_Pedido,id_Producto}=data;
    try {
        const response = await axios.get(
            `/sol/:id?&id_Pedido=${id_Pedido}&id_Producto=${id_Producto}`);
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

export async function updateSolicitud(data) {

    const {id_Pedido, id_Producto,cantidad,estado}=data;

    try {
        //console.log("entro a update");
        //console.log(id_Pedido, id_Producto,cantidad,estado);
        
        const response = await axios.patch( `/sol/:id?&id_Pedido=${id_Pedido}&id_Producto=${id_Producto}`,
            {
                cantidad: cantidad,
                estado: estado
            }
        );
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}





export async function deleteSolicitud(data) {
    //console.log("dataSolicitud en services",data);
    const {id_Pedido,id_Producto}=data[0];
    try {
        const response = await axios.delete(
            `/sol/:id?&id_Pedido=${id_Pedido}&id_Producto=${id_Producto}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}