import { deleteMesa } from '@services/mesa.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';

const useDeleteProducto = (fetchMesa, setDataMesa) => {
    const handleDelete = async (dataProducto) => {
      
        if (dataProducto.length > 0){
            try {
                const result = await deleteDataAlert();
                if(result.isConfirmed){
                    const response = await deleteMesa(dataProducto[0].id);
                    if(response.status === 'client error'){
                        return showErrorAlert('Error',response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La mesa se ha eliminado con exito');
                    await fetchMesa();
                    setDataMesa([]);
                } else{
                    showErrorAlert('Cancelado','La operacion ha sido cancelada');
                }

            } catch (error) {
                console.log("Error al eliminar la mesa",error);
                showErrorAlert("Cancelado","Ocurrio un error al eliminar la mesa");
            }
        }
    };
    return {
        handleDelete
    };
};

export default useDeleteProducto;