import { useState, useEffect } from 'react';
import { getProductos } from '@services/producto.service.js';

const useProducto = () => {
    const [productos, setProductos] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const handleClickUpdate = () => {
        setIsPopupOpen(true);
    };

    const fetchProductos = async () => {
        try {
            const response = await getProductos();
           
            const formattedData = response.data.map(producto => ([{
                nombre:producto.nombre,
                id: producto.id,
                valor:producto.valor,
                stock:producto.stock,
                cantidad:producto.cantidad
                //createdAt: mesa.createdAt
            }]));
            setProductos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);
    

    return { productos, fetchProductos, setProductos,isPopupOpen,setIsPopupOpen };
};

export default useProducto;