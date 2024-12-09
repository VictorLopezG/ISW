import { createPedido, updatePedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitud, getSolicitudesByPedido } from '../services/solicitud.service';
import useEditSolicitud from '../hooks/solicitud/useEditSolicitud';
import { useState, useEffect, useCallback } from 'react';
import Table from '../components/Table';

const Pedidos = () => {
    let id_Pedido = -1;
    const { productos, fetchProductos, setProductos } = useProducto();

    const [solicitudes, setSolicitudes] = useState([]);

    const fetchSolicitudes = async () => {
        try {
            const response = await getSolicitudesByPedido(id_Pedido);
            const formattedData = response.map(cocina => ({
                id_Pedido: cocina.id_Pedido,
                id_Producto: cocina.id_Producto,
                producto: cocina.producto,
                cantidad: cocina.cantidad,
            }));
            console.log(formattedData)
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
        //console.log(data);
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

    let total = 0;
    let categoria = opcionesP;
    const submitPedido = async () => {
        const soli = await getSolicitudesByPedido(id_Pedido)
        console.log(soli);
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
                            label: "Descripcion",
                            name: "descripcion",
                            placeholder: "Inserte descripcion del pedido",
                            fieldType: 'input',
                            type: "string",
                            required: true,
                            minLength: 0,
                            maxLength: 255,
                            pattern: /^[a-zA-Z0-9 ]+$/,
                            patternMessage: "Debe contener solo letras y números",

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
                        }
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
                </div>
            </main>
        </div>
    );
};

export default Pedidos;