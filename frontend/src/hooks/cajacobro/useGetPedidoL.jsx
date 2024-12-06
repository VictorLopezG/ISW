import { useState } from "react";
import { getPedidosListo } from "@services/cajacobro.service.js";

const useGetPedidoL = () => {
    console.log("entro a useGetPedidoL");
    const [pedidosListos, setPedidosListos] = useState([]);
    console.log("pedidosListos:::::::");

    const fetchPedidosListos = async () => {
        try {
            console.log("entro a fetchPedidosListos");
            const response = await getPedidosListo();
            console.log("response");

            setPedidosListos(response);
        } catch (error) {
            console.error("Error al obtener pedidos listos: ", error);
        }
    };

    return { pedidosListos, fetchPedidosListos, setPedidosListos };
}
export default useGetPedidoL;