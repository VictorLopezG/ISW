import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { crearMesa } from '../services/mesa.service';
import useMesas from '@/hooks/mesas/useMesas.jsx';

export default function PopupProducto({ show, setShow, data, action }) {
    const mesaData = data && data.length > 0 ? data[0] : {};

    const {
        errorDescripcion,
        errorCapacidad,
        handleInputChange
    } = useMesas();

    const handleSubmit = async (formData) => {
    try{
        let mesa_creada = await crearMesa(formData);
        console.log(mesa_creada);
        if (mesa_creada.status === 'Success'){
        showSuccessAlert("Mesa creada","La Mesa ha sido creado correctamente.");
        action(formData)
        } else {
            showErrorAlert("Error",mesa_creada);
        }
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
                                errorMessageData: errorDescripcion,
                                onchange: (e) => handleInputChange('descripcion', e.target.value),
                                required: true,
                                maxLength: 50,
                                pattern: /^(?!0)[\d\n]+$/,
                                patternMessage: "Debe contener solo numeros y no puede iniciar por 0",
                            },
                            {
                                label: "Capacidad mesa",
                                name: "capacidad",
                                defaultValue: mesaData.capacidad || "",
                                placeholder: 1,
                                fieldType: 'input',
                                type: "number",
                                errorMessageData: errorCapacidad,
                                onchange: (e) => handleInputChange('capacidad', e.target.value),
                                required: true,
                                min: 1,
                                max: 15,
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