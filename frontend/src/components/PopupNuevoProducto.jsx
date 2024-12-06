import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { createProducto } from '../services/producto.service';
import { act } from 'react';

export default function PopupProducto({ show, setShow, data, action }) {
    const productData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = async (formData) => {
    try{
        await createProducto(formData);
        showSuccessAlert("Producto creado","El producto ha sido creado correctamente.");
        action(formData)
    }catch (error){
        showErrorAlert("Error","Ocurrio un error al crear el producto.");
        console.error("Error al crear el producto: ",error);
        
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
                        title="Producto Nuevo"
                        fields={[
                            {
                                label: "Nombre producto",
                                name: "nombre",
                                defaultValue: productData.nombre || "",
                                placeholder: 'Nombre producto',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                maxLength: 50,
                                pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                patternMessage: "Debe contener solo letras y espacios",
                            },
                            {
                                label: "Valor producto",
                                name: "valor",
                                defaultValue: productData.valor || "",
                                placeholder: 0,
                                fieldType: 'input',
                                type: "number",
                                required: true,
                                max: 100000,
                            },
                            {
                                label: "Stock",
                                name: "stock",
                                defaultValue: productData.stock || "",
                                placeholder: 0,
                                fieldType: 'input',
                                type: "number",
                                max: 1000,
                                patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                                required: true,
                            },
                            {
                                label: "Categoria",
                                name: "categoria",
                                fieldType: 'select',
                                options: [
                                    { value: 'entrada', label: 'entrada' },
                                    { value: 'bebestible', label: 'bebestible' },
                                    { value: 'postre', label: 'postre' },
                                    { value: 'ensalada', label: 'ensalada' },
                                    { value: 'plato de fondo', label: 'plato de fondo' },
                                ],
                                required: true,
                                defaultValue: productData.rol || "",
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Crear Producto"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}