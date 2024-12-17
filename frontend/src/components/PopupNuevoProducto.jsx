import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { createProducto } from '../services/producto.service';
import useProducto from '@hooks/productos/useProducto.jsx';


export default function PopupProducto({ show, setShow, data, action }) {
    const productData = data && data.length > 0 ? data[0] : {};

    const {
        errorNombre,
        errorValor,
        errorStock,
        errorCategoria,
        handleInputChange
    } = useProducto();

    const handleSubmit = async (formData) => {
        try {
            let producto_creado = await createProducto(formData);
            if (producto_creado.status === 'Success') {
                showSuccessAlert("Producto creado", "El producto ha sido creado correctamente.");
                action(formData)
            } else {
                showErrorAlert("Error", producto_creado);
            }

        } catch (error) {
            showErrorAlert("Error", "Ocurrio un error al crear el producto.");
            console.error("Error al crear el producto: ", error);
        }
    };

    return (
        <div>
            {show && (
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
                                    errorMessageData: errorNombre,
                                    onchange: (e) => handleInputChange('nombre', e.target.value),
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
                                    min: 1,
                                    max: 1000000,
                                    errorMessageData: errorValor,
                                    onchange: (e) => handleInputChange('valor', e.target.value),
                                },
                                {
                                    label: "Stock",
                                    name: "stock",
                                    defaultValue: productData.stock || "",
                                    placeholder: 0,
                                    fieldType: 'input',
                                    type: "number",
                                    min: 1,
                                    max: 1000,
                                    required: true,
                                    errorMessageData: errorStock,
                                    onchange: (e) => handleInputChange('stock', e.target.value),
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
                                    errorMessageData: errorCategoria,
                                    onchange: (e) => handleInputChange('categoria', e.target.value),

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