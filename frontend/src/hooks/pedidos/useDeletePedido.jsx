import {deletePedido} from '@services/pedido.service.js';
import {deleteDataAlert, showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';

const useDeletePedido = (fetchPedidos, setDataPedido) => {

    const handleDelete = async (dataPedido) => {
        console.log("dataPedido ",dataPedido);
        if (dataPedido.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deletePedido(dataPedido[0].id);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El pedido ha sido eliminado correctamente.');
                    await fetchPedidos();
                    setDataPedido([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el pedido:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el pedido.');
            }
        }
    };

    return {
        handleDelete
    };
};
export default useDeletePedido;