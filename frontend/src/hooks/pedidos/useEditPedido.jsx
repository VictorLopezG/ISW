import { useState } from 'react';
import { updatePedido } from '@services/pedido.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';
import { formatPedidoData } from '../../helpers/formatData';

import { getPedido } from '@services/pedido.service.js';


const useEditPedido = (setPedidos,estadoA, id, onSuccess) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataPedido, setDataPedido] = useState([]);

    const handleClickUpdate = () => {
        if (dataPedido.length > 0) {
            setIsPopupOpen(true);
        }
    };
    /*Actualiza todo*/
    const handleUpdate = async (updatedPedidoData) => {
        if (updatedPedidoData) {
            try {
                const updatedPedido = await updatePedido(updatedPedidoData, dataPedido[0].id);
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                setIsPopupOpen(false);

                const formattedPedido = formatPedidoData(updatedPedido);

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
    /*Actualiza solo el estado*/ 
    const handleUpdateStatus = async () => {
        if (dataPedido.length > 0) {
            try {
                
                const pedidoToUpdate = dataPedido[0];
                const updatedPedidoData = { ...pedidoToUpdate, estado: estadoA };
                const {createdAt,id, ...updatedPedidoData2}= updatedPedidoData;             
                const updatedPedido = await updatePedido(updatedPedidoData2, pedidoToUpdate.id); 
                showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');
                
                const formattedPedido = formatPedidoData(updatedPedido);
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



    const handleUpdateStatus2 = async () => {
        
        try {

            const response = await getPedido(id); 
            const pedido = response.data; 
            const updatedPedidoData = { ...pedido, estado: estadoA }; 
            const { createdAt, ...filteredData } = updatedPedidoData; 
            const updatedPedido = await updatePedido(filteredData, id);
      
            showSuccessAlert('¡Actualizado!', 'El pedido ha sido actualizado correctamente.');

            if (onSuccess) {
                await onSuccess();
              }

            setPedidos(prevPedidos => {
                if (!Array.isArray(prevPedidos)) {
                    console.log("prevPedidos no es un arreglo:", prevPedidos);
                    return []; 
                }
                return prevPedidos.map(pedido =>
                    pedido.id === updatedPedido.id ? updatedPedido : pedido
                );
            });

        } catch (error) {
            console.error('Error al actualizar el estado del pedido:', error);
            showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el pedido.');
        }
    };
    
    
    

    return {
        handleClickUpdate,
        handleUpdate,
        handleUpdateStatus,
        isPopupOpen,
        setIsPopupOpen,
        dataPedido,
        setDataPedido,
        handleUpdateStatus2
        
    };
};

export default useEditPedido;

