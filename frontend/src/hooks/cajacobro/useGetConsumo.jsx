import { useState } from "react";
import { getconsumo } from "@services/cocinaConsulta.service.js";

const useGetConsumo = (id_Pedido) => {
    //console.log(id_Pedido);
    
    const [consumo, setConsumo] = useState([]);

    const fetchConsumo = async () => {
        try {
            const response = await getconsumo(id_Pedido);
          
            const datos=response.map(solicitudes=>({
                id_Pedido: solicitudes.id_Pedido,
                id_Producto: solicitudes.id_Producto,
                cantidad: solicitudes.cantidad,
                nombre: solicitudes.producto,
                precio: solicitudes.valor
            }))
            setConsumo(datos);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return {
        consumo,
        fetchConsumo,
        setConsumo
    };
}
export default useGetConsumo;