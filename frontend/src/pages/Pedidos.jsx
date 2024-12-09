import { createPedido, updatePedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitud, getSolicitudesByPedido } from '../services/solicitud.service';
import useEditSolicitud from '../hooks/solicitud/useEditSolicitud';
import { useState, useEffect, useCallback } from 'react';
import Table from '../components/Table';
var id_Pedido = -1;
let total=0;
const Pedidos = () => {
    
    const { productos, fetchProductos, setProductos } = useProducto();

    const [solicitudes, setSolicitudes] = useState([]);

    const fetchSolicitudes = async () => {
        try {
            const response = await getSolicitudesByPedido(id_Pedido);
            //console.log(response);
            const formattedData = response.map(solicitudes => ({
                id_Pedido: solicitudes.id_Pedido,
                id_Producto: solicitudes.id_Producto,
                cantidad: solicitudes.cantidad,
            }));
            //console.log(formattedData);
            setSolicitudes(formattedData);
        } catch (error) {
            console.log("Error en fetchSolicitudes:", error);
        }
    };

    useEffect(() => {
        fetchSolicitudes(); // Cargar datos inicialmente
    }, []);

    const {
        handleClickUpdate,
        handleUpdate,
        handleUpdateStatus,
        DataSolicitud,
        setDataSolicitud
    } = useEditSolicitud(setSolicitudes, fetchSolicitudes);

    //BUSCAR SOLICITUDES
    const [filterId, setFilterId] = useState('');
    const handleIdFilterChange = (e) => {
        setFilterId(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedSolcitud) => {
        setDataSolicitud(selectedSolcitud);
    }, [setDataSolicitud]);

    const columns = [
        { title: "Cantidad", field: "cantidad", width: 100, responsive: 1 },
        { title: "producto", field: "id_Producto", width: 200, responsive: 0 },
    ];


    const handlecreateclick = async (data) => {
        console.log(data);
        const { IDmesa, descripcion, id_Producto, cantidad } = data;
        if (id_Pedido === -1) {
            const pedido = { IDmesa, descripcion };
            try {
                const response = await createPedido(pedido);
                if (response.status === 'Client error') {
                    //console.log(response);
                } else {
                    //console.log(response.data.id);
                    id_Pedido = response.data.id;
                }
            } catch (error) {
                //console.log(error);
            }
        }
        try {
            const resp = await createSolicitud({ id_Pedido, id_Producto, cantidad, estado: 'pendiente' });
            //console.log(resp);
        } catch (error) {

        }
        await fetchProductos();
    }

    const { mesas } = useMesas();

    const opcionesM = mesas.map(mesa => ({
        value: mesa.id,
        label: mesa.descripcion
    }));

    const opcionesP = productos.map(producto => ({
        value: producto.id,
        label: producto.nombre,
        categoria: producto.categoria,
        valor: producto.valor,
        stock: producto.stock,
    }));

    const submitPedido = async () => {
        //console.log(id_Pedido);
        const soli = await getSolicitudesByPedido(id_Pedido);
        console.log(soli);
        await fetchProductos();
    };

    return (
        <div>
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
                            options: opcionesM,
                        },
                        {
                            label: 'Seleccionar producto',
                            fieldType: 'select',
                            options: opcionesP,
                            name: 'id_Producto'
                        },
                        {
                            label: "Cantidad",
                            name: "cantidad",
                            min: 1,
                            placeholder: 1,
                            fieldType: 'input',
                            type: "number",
                            required: true,
                            max: 10
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
                    buttonText="Agregar producto"
                    onSubmit={handlecreateclick}
                    altButton='Finalizar'
                    buttonAction={submitPedido}
                />
                <div>
                    <Table
                        // Esto fuerza el re-render cuando `solicitudes` cambia
                        data={solicitudes}
                        columns={columns}
                        filter={filterId}
                        dataToFilter="id"
                        initialSortName="id"
                        onSelectionChange={handleSelectionChange}
                    />
                    <h1>    Total: ${total} </h1>
                </div>
            </main>
        </div>
    );
};

export default Pedidos;