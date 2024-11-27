import deletesolicitud from '@services/solicitud.services.js';
import {deleteDataAlert, showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';

const useDeletesolicitud = (fetchSolicitud, setDataSolicitud) => {
    const handleDelete = async (dataSolicitud) => {
        console.log(dataSolicitud[0].id);
        if (dataSolicitud.length > 0){
            try {
                const result = await deleteDataAlert();
                if(result.isConfirmed){
                    const response = await deletesolicitud(dataSolicitud[0].id);
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