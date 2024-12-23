import { useState, useEffect } from 'react';

const useCreatePedido = () => {
    const [pedido, setPedidos] = useState([]);

    const createPedido = async () => {
        try {
            const response = await createPedido();
       
            const formattedData = response.map(pedido => ({
                descripcion: pedido.descripcion,
                total: pedido.total,
                mesaID: pedido.mesaID,
            }));
            setPedidos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        createPedido();
    }, []);

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    return { pedido, createPedido, setPedidos, handleInputChange };
};

export default useCreatePedido;