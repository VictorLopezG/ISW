import { useState } from 'react';
import { updateMesa } from '@services/mesa.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useEditMesa = (setMesas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataMesas, setDataMesas] = useState([]);

    const handleClickUpdate = () => {
        if (dataMesas.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedMesasData) => {
        if (updatedMesasData){
            try{
                const updateMesas = await updateMesa(updatedMesasData,dataMesas[0].id)
                showSuccessAlert('¡Actualizado!','La mesa ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                setMesas(prevMesas => prevMesas.map(mesa =>{
                    if(mesa.id === updateMesas.id){
                     
                    }
                    return mesa.id === updateMesas.id ? updateMesas : mesa;
                })
                );
                setDataMesas([]);
            }catch (error){
                console.error('Error al actualizar la mesa:', error);
                showErrorAlert('Cancelado','Ocurrio un error al actualizar la mesa.');
            }
        }
    };
    return{
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataMesas,
        setDataMesas
    };
};

export default useEditMesa;