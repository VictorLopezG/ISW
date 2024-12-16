import { useNavigate } from 'react-router-dom';
import { register } from '@services/auth.service.js';
import Form from "@components/Form";
import useRegister from '@hooks/auth/useRegister.jsx';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '@styles/form.css';

const Register = () => {
    const navigate = useNavigate();
    const {
        errorEmail,
        errorRut,
        errorData,
        handleInputChange
    } = useRegister();

    const registerSubmit = async (data) => {
        try {
            const response = await register(data);
            if (response.status === 'Success') {
                showSuccessAlert('¡Registrado!', 'Usuario registrado exitosamente.');
                setTimeout(() => {
                    navigate('/users');
                }, 3000)
            } else if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.error("Error al registrar un usuario: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
        }
    }

    const patternRut = new RegExp(/^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/)

    return (
        <main className="container">
            <Form
                title="Registrar nuevo usuario"
                fields={[
                    {
                        label: "Nombre completo",
                        name: "nombreCompleto",
                        placeholder: "Escriba su nombre aqui",
                        fieldType: 'input',
                        type: "text",
                        required: true,
                        minLength: 15,
                        maxLength: 50,
                        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                        patternMessage: "Debe contener solo letras y espacios",
                    },
                    {
                        label: "Rut",
                        name: "rut",
                        placeholder: "xx.xxx.xxx-x",
                        fieldType: 'input',
                        type: "text",
                        minLength: 9,
                        maxLength: 12,
                        pattern: patternRut,
                        patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                        required: true,
                        errorMessageData: errorRut,
                        onChange: (e) => handleInputChange('rut', e.target.value)
                    },
                    {
                        label: "Correo electrónico",
                        name: "email",
                        placeholder: "ejemplo@gmail.cl",
                        fieldType: 'input',
                        type: "email",
                        required: true,
                        minLength: 15,
                        maxLength: 35,
                        errorMessageData: errorEmail,
                        validate: {
                            emailDomain: (value) => value.endsWith('@gmail.cl') || 'El correo debe terminar en @gmail.cl'
                        },
                        onChange: (e) => handleInputChange('email', e.target.value)
                    },
                    {
                        label: "Contraseña",
                        name: "password",
                        placeholder: "**********",
                        fieldType: 'input',
                        type: "password",
                        required: true,
                        minLength: 8,
                        maxLength: 26,
                        pattern: /^[a-zA-Z0-9]+$/,
                        patternMessage: "Debe contener solo letras y números",
                    },
                    {
                        label: "Rol",
                        name: "rol",
                        fieldType: 'select',
                        required: true,
                        options:[
                            { value: 'administrador', label: 'Administrador' },
                            { value: 'Admin Local', label: 'Administrador Local' },
                            { value: 'mesero', label: 'Mesero' },
                            { value: 'cocinero', label: 'Cocinero' },
                            { value: 'cajero', label: 'Cajero' },
                        ]
                    },
                ]}
                buttonText="Registrar"
                onSubmit={registerSubmit}
            />
        </main>
    );
};

export default Register;