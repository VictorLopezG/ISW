import { createPedido, deletePedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitud } from '../services/solicitud.service';

const Pedidos = () => {
    const { mesas } = useMesas();

    const opcionesM = mesas.map(mesa => ({
        value: mesa[0].id,
        label: mesa[0].descripcion
    }));

    const { productos } = useProducto();

    const opcionesP = productos.map(producto => ({
        value: producto[0].id,
        label: producto[0].nombre
    }));

    const submitPedido = async (data) => {
        const { IDmesa, descripcion, total, id_Producto, cantidad } = data;
        const pedido = { IDmesa, descripcion, total }
        let id_Pedido = 0;
        try {
            const response = await createPedido(pedido);
            if (response.status === 'Client error') {
                console.log(response);
            } else {
                console.log(response.data);

            }
            id_Pedido = response.data.id;
        } catch (error) {
            console.log(error);
        }
        try {
            const solicitud = { id_Pedido, id_Producto, cantidad }
            let response = await createSolicitud(solicitud);
            if (response.status === 'Client error') {
                console.log(response);
                try {
                    response = await deletePedido(id_Pedido);
                } catch (error) {
                    console.log(response)
                }
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <main className="container h-full">
                <Form
                    title="Crear un pedido"
                    fields={[
                        {
                            label: "Mesa del pedido",
                            name: "IDmesa",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options: opcionesM,
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
                            name: "id_Producto",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options: opcionesP
                        },
                        {
                            label: "Cantidad",
                            name: "cantidad",
                            type: "number",
                            min: '0',
                            fieldType: "input",
                            required: true
                        },
                        {
                            label: "Total",
                            name: "total",
                        },
                    ]}
                    buttonText="Crear Pedido"
                    onSubmit={submitPedido}
                />
            </main>
        </div>
    );
};

export default Pedidos;