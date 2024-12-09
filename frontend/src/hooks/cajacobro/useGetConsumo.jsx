
import { useState, useEffect } from "react";
import { getconsumo } from "@services/cocinaConsulta.service.js";

const useGetConsumo = (id_Pedido) => {
    const [consumo, setConsumo] = useState([]);

  const fetchConsumo = async () => {
    if (!id_Pedido) return; // No hacer fetch si no hay ID
    try {
       
      const response = await getconsumo(id_Pedido);
      setConsumo(response);
      
    } catch (error) {
      console.error("Error al obtener consumo: ", error);
    }
  };

  useEffect(() => {
    fetchConsumo();
  }, [id_Pedido]);

  return {
    consumo,
    fetchConsumo,
  };
};

export default useGetConsumo;