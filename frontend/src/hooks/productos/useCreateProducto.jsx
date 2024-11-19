import { useState, useEffect } from "react";


const useCreateProducto = () => {
    const [producto, setProductos] = useState([]);

    const createProducto = async () => {
        try{
            const response = await createProducto();
            console.log(response)
            const formattedData = response.map(producto => ({
                nombre: producto.nombre,
                valor: producto.valor,
                stock: producto.stock,
            }));
            setProductos(formattedData);
        }catch (error){
            console.error("Error: ",error);
        }

    };

    useEffect(() => {
        createProducto();
    }, []);

    const handleInputChange = (field, value) => {
        setInputData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };
    
    return { producto, createProducto, setProductos , handleInputChange}
};

export default useCreateProducto;