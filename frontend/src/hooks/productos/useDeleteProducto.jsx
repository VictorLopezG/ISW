import { deleteproducto } from '@services/producto.service.js';
import {deleteDataAlert, showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';

const useDeleteProducto = (fetchProductos, setDataProductos) => {
    const handleDelete = async (dataProducto) => {
        if (dataProducto.length > 0){
            try {
                const result = await deleteDataAlert();
                if(result.isConfirmed){
                    const response = await deleteproducto(dataProducto[0].id);
                    if(response.status === 'client error'){
                        return showErrorAlert('Error',response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El productos ha sido eliniado con exito');
                    await fetchProductos();
                    setDataProductos([]);
                } else{
                    showErrorAlert('Cancelado','La operacion ha sido cancelada');
                }

            } catch (error) {
                console.log("Error al eleminar el producto",error);
                showErrorAlert("Cancelado","Ocurrio un error al eliminar el producto");
            }
        }
    };
    return {
        handleDelete
    };
};

export default useDeleteProducto;
