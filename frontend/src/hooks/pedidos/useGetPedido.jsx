import { useState, useEffect } from 'react';
import { getPedidos } from '@services/pedido.service.js';

const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    const fetchPedidos = async () => {
        try {
            const response = await getPedidos();
            const formattedData = response.data.map(pedido => ({
                id: pedido.id,
                descripcion: pedido.descripcion,
                total: pedido.total,
                estado: pedido.estado,
                mesaID: pedido.mesaID,
                createdAt: pedido.createdAt
            }));
            console.log(formattedData);
            setPedidos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    return { pedidos, fetchPedidos, setPedidos };
};

export default usePedidos;