import { useState, useEffect } from 'react';
import { getProductos } from '@services/producto.service.js';

const useProducto = () => {
    const [productos, setProductos] = useState([]);

    const fetchProductos = async () => {
        try {
            const response = await getProductos();

            //console.log(response.data); 
            const formattedData = response.data.map(producto => ({

                nombre:producto.nombre,
                id: producto.id,
                valor:producto.valor,
                stock:producto.stock,
                categoria:producto.categoria,
                cantidad:producto.cantidad
                //createdAt: mesa.createdAt
            }));
            setProductos(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return { productos, fetchProductos, setProductos };

};

export default useProducto;