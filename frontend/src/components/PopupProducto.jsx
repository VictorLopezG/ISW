import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupProducto({ show, setShow, data, action }) {
    const productData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
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
                        title="Editar Producto"
                        fields={[
                            {
                                label: "Nombre producto",
                                name: "nombre",
                                defaultValue: productData.nombre || "",
                                placeholder: 'Nombre producto',
                                fieldType: 'input',
                                type: "text",
                                required: true,
                                maxLength: 31,
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
                        buttonText="Actualizar Producto"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}