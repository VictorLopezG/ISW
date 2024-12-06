import { useState } from "react";
import { updateSolicitud } from "@services/solicitud.service.js";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';


const useEditSolicitud = (setSolicitudes, fetchSolicitudes) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataSolicitud, setDataSolicitud] = useState([]);

    const handleClickUpdate = () => {
        if (dataSolicitud.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedSolicitudData) => {
        if (updatedSolicitudData) {
            try {
                console.log("updatedSolicitudData", updatedSolicitudData);


                const updatedSolicitud = await updateSolicitud(updatedSolicitudData);
                showSuccessAlert('¡Actualizado!', 'La solicitud ha sido actualizada correctamente.');
                setIsPopupOpen(false);

                setSolicitudes(prevSolicitudes => prevSolicitudes.map(solicitud => {

                    return solicitud.id_Pedido === updatedSolicitud.id_Pedido &&
                        solicitud.id_Producto === updatedSolicitud.id_Producto
                        ? updatedSolicitud
                        : solicitud;
                    ;
                }));
                setDataSolicitud([]);

            } catch (error) {
                console.error('Error al actualizar la solicitud:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar la solicitud.');
            }
        }
    };
    

    /* Actualiza solo el estado de la solicitud */
    const handleUpdateStatus = async () => {
        if (dataSolicitud.length > 0) {
            try {
                const solicitudToUpdate = dataSolicitud[0];
                const updatedSolicitudData = { ...solicitudToUpdate, estado: "listo" };
                const { id_Pedido, id_Producto, ...rest } = updatedSolicitudData;
    
                const payload = { ...rest, id_Pedido, id_Producto };
    
                // Realiza la actualización
                const updatedSolicitud = await updateSolicitud(payload, id_Pedido, id_Producto);
    
                showSuccessAlert('¡Actualizado!', 'La solicitud ha sido actualizada correctamente.');
    
                // Vuelve a cargar los datos después de la actualización
                await fetchSolicitudes(); // Asegúrate de que fetchSolicitudes sea una función definida
    
                setDataSolicitud([]); // Limpia la selección
            } catch (error) {
                console.error('Error al actualizar la solicitud:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar la solicitud.');
            }
        }
    };
    
    
    
    
    return {
        handleClickUpdate,
        handleUpdate,
        handleUpdateStatus,
        isPopupOpen,
        setIsPopupOpen,
        dataSolicitud,
        setDataSolicitud
    };
    


}




export default useEditSolicitud;