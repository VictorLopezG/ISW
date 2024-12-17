import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';


export default function PopupProducto({ show, setShow, data, action }) {
    const mesaData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formdata) => {
        action(formdata);
    }

    return (
        <div>
            { show && (
            <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar Mesa"
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
                                required: true,
                                min: 1,
                                max: 15,
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Actualizar Mesa"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
}