import { useState } from 'react';
import { updateProducto } from '@services/producto.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

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
            /*Recuerda dps hacer todas a minusculas*/ 
            let updateProduc = await updateProducto(updatedProductoData, dataProducto[0].id)
            if (updateProduc[0].status === 'Success'){
            showSuccessAlert('¡Actualizado!','El producto ha sido actualizado correctamente.');
            setProductos(prevProductos => prevProductos.map(producto =>{
                if(producto.id === updateProduc.id){
                    console.log("Reemplazando con:",updateProduc);
                }
                setIsPopupOpen(false);
                return producto.id === updateProduc[1].id ? updateProduc[1] : producto;
            }));

            }  else {
                showErrorAlert("Error", updateProduc.details.message)
            }
            
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