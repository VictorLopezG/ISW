import { useState } from "react";
import { updateSolicitud, deleteSolicitud } from "@services/solicitud.service.js";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import {deleteDataAlert} from '@helpers/sweetAlert.js';

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
                console.log("dataSolicitud", dataSolicitud);
                const solicitudToUpdate = dataSolicitud[0];
                const updatedSolicitudData = { ...solicitudToUpdate, estado: "listo" };
                const { id_Pedido, id_Producto, ...rest } = updatedSolicitudData;

                const payload = { ...rest, id_Pedido, id_Producto };

                // Realiza la actualización
                const updatedSolicitud = await updateSolicitud(payload, id_Pedido, id_Producto);

                showSuccessAlert('¡Actualizado!', 'La solicitud ha sido actualizada correctamente.');

                // Vuelve a cargar los datos después de la actualización
                await fetchSolicitudes();

                setDataSolicitud([]); // Limpia la selección



                console.log("handleClickUpdate: ", handleClickUpdate);
                console.log("handleUpdateStatuus: ", handleUpdateStatus);
                console.log("dataSolicitud: ", dataSolicitud);
                console.log("setDataSolicitud: ", setDataSolicitud);

            } catch (error) {
                console.error('Error al actualizar la solicitud:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar la solicitud.');
            }
        }
    };

    const handleDelete = async () => {
        console.log("dataSolicitud ", dataSolicitud);
        console.log("dataSolicitud.length ", dataSolicitud.length);
        if (dataSolicitud.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    console.log("dataSolicitud antes del services",dataSolicitud);
                    const response = await deleteSolicitud(dataSolicitud);
                    if (response.status === 'client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El solicitud ha sido eliminado con exito');
                    await fetchSolicitudes();
                    setDataSolicitud([]);
                } else {
                    showErrorAlert('Cancelado', 'La operacion ha sido cancelada');
                }

            } catch (error) {
                console.log("Error al eliminar el solicitud", error);
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