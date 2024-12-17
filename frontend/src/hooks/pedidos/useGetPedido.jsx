import { useState, useEffect } from 'react';
import { getPedidos } from '@services/pedido.service.js';

const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [anos, setAnos] = useState([]);

    const fetchPedidos = async () => {
        const opciones = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

        try {
            const response = await getPedidos();

            const formattedData = response.data.map(pedido => ({
                id: pedido.id,
                descripcion: pedido.descripcion,
                total: pedido.total,
                mesaID: pedido.mesaID,
                createdAt: new Date(pedido.createdAt).toLocaleDateString("es-ES", opciones),
                estado: pedido.estado,
            }));

            setPedidos(formattedData);

            // Filtrar los pedidos con estado "Pagado" y extraer los años distintos
            const pedidosPagados = response.data.filter(pedido => pedido.estado === 'Pagado');
            const anosSet = new Set(pedidosPagados.map(pedido => new Date(pedido.createdAt).getFullYear()));
            setAnos([...anosSet]);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    return { pedidos, fetchPedidos, setPedidos, anos };
};

export default usePedidos;