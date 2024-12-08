import { useState } from "react";
import { getPedidosListo } from "@services/cajacobro.service.js";

const useGetPedidoL = () => {
  
    const [pedidosListos, setPedidosListos] = useState([]);
  

    const fetchPedidosListos = async () => {
        try {
          
            const response = await getPedidosListo();
    

            setPedidosListos(response);
        } catch (error) {
            console.error("Error al obtener pedidos listos: ", error);
        }
    };

    return { pedidosListos, fetchPedidosListos, setPedidosListos };
}
export default useGetPedidoL;