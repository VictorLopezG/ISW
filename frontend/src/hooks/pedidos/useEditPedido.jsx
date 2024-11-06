import { useState } from 'react';
import { updatePedido } from '@services/pedido.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

const useEditPedido = (setPedidos) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataPedido, setDataPedido] = useState([]);

    const handleClickUpdate = () => {
        if (dataPedido.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedPedidoData) => {
        if (updatedPedidoData) {
            try {
                const updatedPedido = await updatePedido(updatedPedidoData, dataPedido[0].id);
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedPedido = formatPostUpdate(updatedPedido);

                setPedidos(prevPedidos => prevPedidos.map(pedido => {
                    console.log("Pedido actual:", pedido);
                    if (pedido.id === formattedPedido.id) {
                        console.log("Reemplazando con:", formattedPedido);
                    }
                    return pedido.id === formattedPedido.id ? formattedPedido : pedido;
                })
                );
                setDataPedido([]);
            } catch (error) {
                console.error('Error al actualizar el pedido:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el pedido.');



            }
        }
    };

    const handleUpdateStatus = async () => {
        if (dataPedido.length > 0) {
            try {
                
                const pedidoToUpdate = dataPedido[0];
                const updatedPedidoData = { ...pedidoToUpdate, estado: "listo" };
                const {createdAt,id, ...updatedPedidoData2}= updatedPedidoData;
                
                const updatedPedido = await updatePedido(updatedPedidoData2, pedidoToUpdate.id);
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                const formattedPedido = formatPostUpdate(updatedPedido);
                setPedidos(prevPedidos =>
                    prevPedidos.map(pedido => 
                        pedido.id === formattedPedido.id ? formattedPedido : pedido
                    )
                );
                setDataPedido([]);
            } catch (error) {
                console.error('Error al actualizar el pedido:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el pedido.');
            }
        }
    };
    

    return {
        handleClickUpdate,
        handleUpdate,
        handleUpdateStatus,
        isPopupOpen,
        setIsPopupOpen,
        dataPedido,
        setDataPedido
    };
};

export default useEditPedido;

