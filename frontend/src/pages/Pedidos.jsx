import { createPedido} from '@services/pedido.service.js';
import Form from '@components/Form';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitud } from '../services/solicitud.service';
import Table from '../components/Table';
import { useState } from 'react';
import { updateProducto } from '@/services/producto.service';

let id_Pedido = -1;
let total = 0;

const Pedidos = () => {
    let [solicitudes, setSolicitudes] = useState([]);
    const { productos } = useProducto();

    const opcionesP = productos.map(producto => ({
        value: producto.id,
        label: producto.nombre,
        categoria: producto.categoria,
        valor: producto.valor,
        stock: producto.stock,
    }));

    function filtrarDisponibles(lista) {
        return Array.prototype.filter.call(lista, (producto) => producto.stock > 0);
    }

    const disponibles = filtrarDisponibles(opcionesP);

    const columns = [
        { title: "Cantidad", field: "cantidad", width: 75, responsive: 0 },
        { title: "Producto", field: "nombre", width: 200, responsive: 0 },
        { title: "Valor Unit.", field: "precio", width: 100, responsive: 0 },
    ];

    const handlecreateclick = async (data) => {
        const {valor,label,stock} = await disponibles.find(prod => prod.value == data.id_Producto);
        if(data.cantidad>stock){
            console.log("no hay suficiente stock del producto");
            return;
        }
        const sol = { id_Producto: data.id_Producto, cantidad: data.cantidad ,precio:valor,nombre:label};
        // Verificar si el producto ya existe en solicitudes
        const updatedSolicitudes = solicitudes.map((solicitud) => {
            if (solicitud.id_Producto === sol.id_Producto) {
                if (sol.cantidad > 0 ) {
                    return { ...solicitud, cantidad: sol.cantidad}; // Actualizar cantidad
                }
                return null; // Marcar para eliminar
            }
            return solicitud; // No modificar si no coincide
        }).filter(solicitud => solicitud !== null); // Eliminar los marcados como null
        //console.log(updatedSolicitudes);
        if (!updatedSolicitudes.some(solicitud => solicitud.id_Producto === sol.id_Producto) 
            && sol.cantidad > 0 && sol.id_Producto) {
            updatedSolicitudes.push(sol); // Agregar si no existía y la cantidad es > 0
        }
        setSolicitudes(updatedSolicitudes);
        total=0;
        updatedSolicitudes.map(a => { total += a.precio * a.cantidad });
        //console.log(updatedSolicitudes);
    }

    const { mesas } = useMesas();

    const opcionesM = mesas.map(mesa => ({
        value: mesa.id,
        label: mesa.descripcion
    }));

    const submitPedido = async (data) => {
        const { IDmesa, descripcion } = data;
        if (id_Pedido === -1 && solicitudes!=[]) {
            const pedido = { IDmesa, descripcion,total};
            //console.log(data);
            try {
                const response = await createPedido(pedido);
                if (response.status === 'Client error') {
                    console.error(response);
                } else {
                    id_Pedido = response.data.id;
                }
            } catch (error) {
                console.error(error);
            }
        }
        for (let i = 0; i < solicitudes.length; i++) {
            const { id_Producto, cantidad } = solicitudes.at(i);
            try {
                const{label,stock,categoria,precio}=await disponibles.find(prod => prod.value ==id_Producto);
                await createSolicitud({ id_Pedido, id_Producto, cantidad, estado: 'pendiente' });
                await updateProducto({nombre:label, valor:precio, stock:stock-cantidad, categoria:categoria  },id_Producto)
                //console.log({ id_Pedido, id_Producto, cantidad });
            } catch (error) {
                console.error(error);
            }
        }
        id_Pedido = -1;
        total=0;
        setSolicitudes([]);
    };

    return (
        <div className='flex flex-columns'>
            <main className="container space-x-8 ">
                <Form
                    title="Crear un pedido"
                    fields={[
                        {
                            label: 'Seleccionar producto',
                            fieldType: 'select',
                            options: disponibles,
                            name: 'id_Producto'
                        },
                        {
                            label: "Cantidad",
                            name: "cantidad",
                            min: 0,
                            defaultValue: 1,
                            fieldType: 'input',
                            type: "number",
                            required: true,
                            max: 5
                        },
                    ]}
                    buttonText="Agregar al pedido"
                    onSubmit={handlecreateclick}
                />
                <div className="bg-[#ffff] p-10 rounded-3xl justify-end items-center space-y-2  w-2/5 h-auto ">
                    <h2>Pedido</h2>
                    <h1>*NOTA: para quitar un producto de la lista seleccionelo con cantidad 0</h1>
                    <Table
                        data={solicitudes}
                        columns={columns}
                    />
                    <h1>    Total: ${total} </h1>
                </div>
                <Form title=""
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
                            fieldType: 'textarea',
                            type: "string",
                            required: false,
                            minLength: 0,
                            maxLength: 255,
                            pattern: /^[a-zA-Z0-9 ]+$/,
                            patternMessage: "Debe contener solo letras y números",

                        },
                    ]}
                    buttonText="Finalizar"
                    onSubmit={submitPedido}
                />
            </main>
        </div>
    );
};

export default Pedidos;