import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { crearMesa } from '../services/mesa.service';
import { act } from 'react';

export default function PopupProducto({ show, setShow, data, action }) {
    const mesaData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = async (formData) => {
    try{
        await crearMesa(formData);
        showSuccessAlert("Mesa creada","La Mesa ha sido creado correctamente.");
        action(formData)
    }catch (error){
        showErrorAlert("Error","Ocurrio un error al crear la mesa.");
        console.error("Error al crear la mesa: ", error);
        
    }

    };

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Nueva Mesa"
                        fields={[
                            {
                                label: "Descricion mesa",
                                name: "descripcion",
                                defaultValue: mesaData.descripcion || "",
                                placeholder: 'Descripcion de la mesa',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Capacidad mesa",
                                name: "capacidad",
                                defaultValue: mesaData.capacidad || "",
                                placeholder: 0,
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                max: 100000,
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Crear Mesa"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}