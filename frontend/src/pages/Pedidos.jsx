import { createPedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import  useMesas from '@hooks/mesas/useGetMesas.jsx';

const Pedidos = () => {

    const { mesas, fetchMesas, setMesas }=useMesas();

    const opcionesM=mesas.map(mesa=>({
        value:mesa[0].id,
        label:mesa[0].descripcion
    }));
    
    const crearSubmit = async (data) => {
        try {
            const response = await createPedido(data);
            if (response.status === 'Client error') {
                errorData(response.details);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="container">
            <Form
                title="Crear un pedido"
                fields={[
                    {
                        label: "Mesa del pedido",
                        name: "IDmesa",
                        placeholder: "",    
                        fieldType: 'select',
                        type: "input",
                        required: true,
                        minLength: 25,
                        maxLength: 30,
                        options:opcionesM,
                    },
                    {
                        label: "Descripcion",
                        name: "descripcion",
                        placeholder: "Inserte descripcion del pedido",
                        fieldType: 'input',
                        type: "string",
                        required: false,
                        minLength: 0,
                        maxLength: 255,
                        pattern: /^[a-zA-Z0-9]+$/,
                        patternMessage: "Debe contener solo letras y números",
                        onChange: (e) => handleInputChange('descripcion', e.target.value)
                    },
                    {
                        label: "Total",
                        name: "total",
                        placeholder: "suma de los productos solicitados",
                        disabled: true,
                        required: false,
                        minLength: 0,   
                        maxLength: 255,
                    },
                ]}
                buttonText="Crear Pedido"
                onSubmit={crearSubmit}
            />
        </main>
        
    );
};

export default Pedidos;