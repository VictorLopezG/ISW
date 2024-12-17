import { useState } from "react";
import { getPedidosListo } from "@services/cajacobro.service.js";

const useGetPedidoL = () => {
  
    const [pedidosListos, setPedidosListos] = useState([]);
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric'};

    const fetchPedidosListos = async () => {
        try {          
            const response = await getPedidosListo();
           const formattedData= response.map(pedido => ({
                id: pedido.id,
                descripcion: pedido.descripcion,
                total: pedido.total,
                mesaID: pedido.mesaID,
                createdAt: new Date(pedido.createdAt).toLocaleDateString("es-ES",opciones),
                estado: pedido.estado
            }));
    

            setPedidosListos(formattedData);
        } catch (error) {
            console.error("Error al obtener pedidos listos: ", error);
        }
    };

    return { pedidosListos, fetchPedidosListos, setPedidosListos };
}
export default useGetPedidoL;