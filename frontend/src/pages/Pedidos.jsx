import { createPedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import  useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos';

const Pedidos = () => {

    const { mesas }=useMesas();

    const opcionesM=mesas.map(mesa=>({
        value:mesa[0].id,
        label:mesa[0].descripcion
    }));

    const {productos}=useProducto();
    
    const opcionesP=productos.map(producto=>({
        value:producto[0].id,
        label:producto[0].nombre
    }));
    
    const submitPedido = async (data) => {
        try {
            //console.log(data);
            const response = await createPedido(data);
            if (response.status === 'Client error') {
                console.log(response);
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
                        fieldType: 'select',
                        type: "input",
                        required: true,
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
                        pattern: /^[a-zA-Z0-9 ]+$/,
                        patternMessage: "Debe contener solo letras y números",
                    
                    },
                    {
                        label: "Producto",
                        name: "prod",
                        placeholder: "Plato solicitado",
                        fieldType: 'select',
                        type: "imput",
                        required: true,
                        options:opcionesP
                        
                    },
                    {
                        label: "Total",
                        name: "total",
                        fieldType:'input',
                        default:'0',
                        placeholder: "suma de los productos solicitados",
                        disabled: true,
                        required: false,
                        minLength: 0,   
                        maxLength: 255,
                    },
                ]}
                buttonText="Crear Pedido"
                onSubmit={submitPedido}
            />
        </main>
        
    );
};

export default Pedidos;