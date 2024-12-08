import axios from './root.service.js';
import { getProducto } from './producto.service.js';


async function crearSolicitudEX(id_Pedido,id_Producto,cantidad){
    //console.log(id_Pedido,id_Producto,cantidad);
    if(cantidad==='0')return "cantidad 0";
    
    try {
        const response = await axios.post('/sol/create', {
            id_Pedido:id_Pedido,
            id_Producto:id_Producto,
            cantidad:cantidad,
            estado:'pendiente'
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

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

export async function createSolicitudes(data){
    const{id_Pedido,solicitudes}=data;
    console.log(data);
    const {pF,entrada,bebida,ensalada,postre,c_pF,c_Ent,c_Beb,c_Ens,c_Pos}=solicitudes;
    try{
        let total=0;
        const responsepF = await crearSolicitudEX(id_Pedido,pF,c_pF);
        let {valor,...prod}   = await getProducto(pF);
        total+=valor*c_pF;
        const responseEntrada = await crearSolicitudEX(id_Pedido,entrada,c_Ent);
        valor,prod   = await getProducto(entrada);
        total+=valor*c_Ent;
        const responseBebida = await crearSolicitudEX(id_Pedido,bebida,c_Beb);
        valor,prod  = await getProducto(bebida);
        total+=valor*c_Beb;
        const responseEnsalada = await crearSolicitudEX(id_Pedido,ensalada,c_Ens);
        valor,prod  = await getProducto(ensalada);
        total+=valor*c_Ens;
        const responsePostre = await crearSolicitudEX(id_Pedido,postre,c_Pos);
        valor,prod  = await getProducto(postre);
        total+=valor*c_Pos;
        console.log(total);
        return total;
    }catch(error){
        return error.response;
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
        console.log("entro a update");
        console.log(id_Pedido, id_Producto,cantidad,estado);
        
        const response = await axios.patch( `/sol/:id?&id_Pedido=${id_Pedido}&id_Producto=${id_Producto}`,
            {
                cantidad: cantidad,
                estado: estado
            }
        );
      
        return response.data.data;
    } catch (error) {

        console.log(error);
        return error.response.data;
    }
}





export async function deleteSolicitud(data) {
    console.log("dataSolicitud en services",data);
    const {id_Pedido,id_Producto}=data[0];
    try {
        const response = await axios.delete(
            `/sol/:id?&id_Pedido=${id_Pedido}&id_Producto=${id_Producto}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}