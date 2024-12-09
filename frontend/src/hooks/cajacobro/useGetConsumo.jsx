import { useState } from "react";
import { getPedidos } from "@services/pedido.service.js";

const useGetConsumo = (id_Pedido) => {
    const [consumo, setConsumo] = useState([]);
    const { ispopupOpen, setIsPopupOpen } = useState(false);

    const handleClickDescripcion = () => {
        if (consumo.length > 0) {
            setIsPopupOpen(true);
        }
    };


    const fetchConsumo = async () => {
        try {
            const response = await getPedidos(id_Pedido);
            setIsPopupOpen(true);
            setConsumo(response.data);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return {
        handleClickDescripcion,
        ispopupOpen,
        consumo,
        fetchConsumo,
        setConsumo
    };


}
