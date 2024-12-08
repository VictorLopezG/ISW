import {deleteSolicitud} from '@services/solicitud.service.js';
import {deleteDataAlert, showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';
import {useState} from 'react';


const useDeletesolicitud = (fetchSolicitudes) => {

    const [dataSolicitud, setDataSolicitud] = useState([]);

    const handleClickDelete = () => {
        if(dataSolicitud.length > 0){
            setIsPopupOpen(true);
        }
    };


    const handleDelete = async () => {
        console.log ("dataSolicitud ",dataSolicitud);
        if (dataSolicitud.length > 0){
            try {
                const result = await deleteDataAlert();
                if(result.isConfirmed){
                        
                    const response = await deleteSolicitud(dataSolicitud);


                    if(response.status === 'client error'){
                        return showErrorAlert('Error',response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El solicitud ha sido eliminado con exito');
                    await fetchSolicitud();
                    setDataSolicitud([]);
                } else{
                    showErrorAlert('Cancelado','La operacion ha sido cancelada');
                }

            } catch (error) {
                console.log("Error al eliminar el solicitud",error);
                showErrorAlert("Cancelado","Ocurrio un error al eliminar el solicitud");
            }
        }
    







        
    };
    return {
        handleDelete
    };

}



export default useDeletesolicitud;