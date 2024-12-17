import { useState } from "react";
import { updateSolicitud, deleteSolicitud } from "@services/solicitud.service.js";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import {deleteDataAlert} from '@helpers/sweetAlert.js';
import { getProducto,updateProducto } from "@/services/producto.service";
import { updatePedido,getPedido, deletePedido } from "@/services/pedido.service";
const useEditSolicitud = (fetchSolicitudes) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataSolicitud, setDataSolicitud] = useState([]);

    const handleClickUpdate = () => {
        if (dataSolicitud.length > 0) {
            setIsPopupOpen(true);
        }
    };



    /* Actualiza solo el estado de la solicitud */
    const handleUpdateStatus = async () => {
        console.log("dataSolicitud::::::", dataSolicitud);
        if (dataSolicitud.length > 0) {
            try {
                
                const solicitudToUpdate = dataSolicitud[0];
                const updatedSolicitudData = { ...solicitudToUpdate, estado: "listo" };
                const { id_Pedido, id_Producto, ...rest } = updatedSolicitudData;

                const payload = { ...rest, id_Pedido, id_Producto };

                
                const updatedSolicitud = await updateSolicitud(payload, id_Pedido, id_Producto);

                showSuccessAlert('¡Actualizado!', 'La solicitud ha sido actualizada correctamente.');

                
                await fetchSolicitudes();

                setDataSolicitud([]); 
             
            } catch (error) {
                console.error('Error al actualizar la solicitud:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar la solicitud.');
            }
        }
    };

    const handleDelete = async () => {
        //console.log("dataSolicitud ", dataSolicitud);
        //console.log("dataSolicitud.length ", dataSolicitud.length);
        if (dataSolicitud.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    //console.log("dataSolicitud antes del services",dataSolicitud);
                    const response = await deleteSolicitud(dataSolicitud);
                    if (response.status === 'client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    const prod=await getProducto(dataSolicitud[0].id_Producto);
                    const{nombre,valor,stock,categoria}=prod;
                    await updateProducto({ nombre: nombre, valor: valor, stock: stock + dataSolicitud[0].cantidad, categoria: categoria }, dataSolicitud[0].id_Producto);
                    const ped=await getPedido(dataSolicitud[0].id_Pedido);
                    //console.log(ped);
                    const {mesaID,total,descripcion}=ped.data;
                    //console.log(dataSolicitud[0].id_Pedido);
                    //console.log(total)
                    if((total-(valor*dataSolicitud[0].cantidad))==0){
                        await deletePedido(dataSolicitud[0].id_Pedido);
                    }else{
                        await updatePedido({IDmesa:mesaID,total:total-valor*dataSolicitud[0].cantidad,descripcion:descripcion},dataSolicitud[0].id_Pedido);
                    }
                    showSuccessAlert('¡Eliminado!', 'El solicitud ha sido eliminado con exito');
                    await fetchSolicitudes();
                    setDataSolicitud([]);
                } else {
                    showErrorAlert('Cancelado', 'La operacion ha sido cancelada');
                }

            } catch (error) {
                //console.log("Error al eliminar el solicitud", error);
                showErrorAlert("Cancelado", "Ocurrio un error al eliminar el solicitud");
            }
        }
    }



        return {
            handleClickUpdate,
            handleUpdateStatus,
            isPopupOpen,
            setIsPopupOpen,
            dataSolicitud,
            setDataSolicitud,
            handleDelete
        };



    }




    export default useEditSolicitud;