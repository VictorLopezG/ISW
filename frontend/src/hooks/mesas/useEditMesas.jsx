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

        if (updatedMesasData) {
            try {
                const updateMesas = await updateMesa(updatedMesasData, dataMesas[0].id)
                if (updateMesas.status === 'Client error') {
                    return showErrorAlert("Error", updateMesas.details.message)
                }

                if (updateMesas[0].status === 'Success') {
                    showSuccessAlert('¡Actualizado!', 'La mesa ha sido actualizado correctamente.');
                    setMesas(prevMesas => prevMesas.map(mesa => {
                        if (mesa.id === updateMesas.id) {
                            console.log("Reemplazando con:", updateMesas);
                        }
                        setIsPopupOpen(false);
                        return mesa.id === updateMesas[1].id ? updateMesas[1] : mesa;
                    }));
                }
                setDataMesas([]);
            } catch (error) {
                console.error('Error al actualizar la mesa:', error);
                showErrorAlert('Cancelado', 'Ocurrio un error al actualizar la mesa.');
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataMesas,
        setDataMesas
    };
};

export default useEditMesa;