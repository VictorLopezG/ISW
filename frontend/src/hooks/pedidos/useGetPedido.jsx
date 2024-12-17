import { useState, useEffect } from 'react';
import { getPedidos } from '@services/pedido.service.js';

const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);

//observar finally
    const fetchPedidos = async () => {

        const opciones = { year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'};


        try {
            const response = await getPedidos();



            const formattedData = response.data.map(pedido => ({
                id: pedido.id,
                descripcion: pedido.descripcion,
                total: pedido.total,
                mesaID: pedido.mesaID,
                createdAt: new Date(pedido.createdAt).toLocaleDateString("es-ES",opciones),
                estado: pedido.estado
            }));
  
            setPedidos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };



    return { pedidos, fetchPedidos, setPedidos };
};

export default usePedidos;