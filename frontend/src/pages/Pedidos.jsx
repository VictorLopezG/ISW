import { createPedido, updatePedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitud, getSolicitudesByPedido } from '../services/solicitud.service';
import Table from '../components/Table';
import useGetConsumo from '@hooks/cajacobro/useGetConsumo.jsx';
var id_Pedido = -1;
let total=0;
let soli;
const Pedidos = () => {
    
    const { productos, fetchProductos, setProductos } = useProducto();
    const {consumo,fetchConsumo,setConsumo}=useGetConsumo(id_Pedido);
    
    /*const [solicitudes, setSolicitudes] = useState([]);

    const fetchSolicitudes = async () => {
        try {
            const response = await getSolicitudesByPedido(id_Pedido);
            //console.log(response);
            const formattedData = response.data.map(solicitudes => ({
                id_Pedido: solicitudes.id_Pedido,
                id_Producto: solicitudes.id_Producto,
                cantidad: solicitudes.cantidad,
            }));
            //console.log(formattedData);|
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
    */
   
    const columns = [
        { title: "Cantidad", field: "cantidad", width: 100, responsive: 0 },
        { title: "producto", field: "nombre", width: 200, responsive: 0 },
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
                    //setSolicitudes((a)=>[response]);
                    id_Pedido = response.data.id;
                }
            } catch (error) {
                //console.log(error);
            }
        }
        try {
            await createSolicitud({ id_Pedido, id_Producto, cantidad, estado: 'pendiente' });
        } catch (error) {
            console.error(error);
        }
        await fetchConsumo();
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

    
    function filtrarDisponibles(lista) {
        return Array.prototype.filter.call(lista, (producto) => producto.stock>0);
    }

    const disponibles= filtrarDisponibles(opcionesP);

    const submitPedido = async () => {
        //console.log(id_Pedido);
        //soli = await getSolicitudesByPedido(id_Pedido);
        console.log(consumo);
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
                            options: disponibles,
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
                    <h2>Pedido</h2>
                    <Table
                        // Esto fuerza el re-render cuando `solicitudes` cambia
                        data={consumo}
                        columns={columns}
                    />
                    <h1>    Total: ${total} </h1>
                </div>
            </main>
        </div>
    );
};

export default Pedidos;