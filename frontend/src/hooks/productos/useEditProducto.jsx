import { useState } from 'react';
import { updateProducto } from '@services/producto.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateproducto } from '@helpers/formatData';


const useEditProducto = (setProductos) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataProducto, setDataProducto] = useState([]);

    const handleClickUpdate = () => {
        if (dataProducto.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedProductoData) => {
        if (updatedProductoData) {
            try{
            const updateProduc = await updateProducto(updatedProductoData, dataProducto[0].id)
            showSuccessAlert('¡Actualizado!','El producto ha sido actualizado correctamente.');
            setIsPopupOpen(false);
            const formattedProducto = formatPostUpdateproducto(updateProduc)
            setProductos(prevProductos => prevProductos.map(producto =>{
                console.log("Producto actual:",producto);
                if(producto.id === formattedProducto.id){
                    console.log("Reemplazando con:",formattedProducto);
                }
                return producto.id === formattedProducto.id ? formattedProducto : producto;
            })
            );
            setDataProducto([]);
            }catch(error){
                console.error('Error al actualizar el Producto:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el Producto.');
            }
        }
    };

    return{
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProducto,
        setDataProducto
    };
};

export default useEditProducto;