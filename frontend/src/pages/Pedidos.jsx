import { createPedido, updatePedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import '@styles/form.css';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitudes } from '../services/solicitud.service';

const Pedidos = () => {

    function filtrarCategoria(lista,categoria){
        return Array.prototype.filter.call(lista,(producto) => producto.categoria.includes(categoria));
    }

    const { mesas } = useMesas();

    const opcionesM = mesas.map(mesa => ({
        value: mesa.id,
        label: mesa.descripcion
    }));

    const { productos} = useProducto();

    const opcionesP = productos.map(producto => ({
        value: producto.id,
        label: producto.nombre,
        categoria: producto.categoria,
        valor:producto.valor,
        stock:producto.stock,
    }));

    const platosFondo = filtrarCategoria(opcionesP,'plato de fondo');
    const postres= filtrarCategoria(opcionesP,"postre");
    const bebestibles = filtrarCategoria(opcionesP,"bebestible");
    const entradas = filtrarCategoria(opcionesP,"entrada");
    const ensaladas = filtrarCategoria(opcionesP,"ensalada");
    
    let total=0;

    const submitPedido = async (data) => {
        const { IDmesa, descripcion, ...solicitudes} = data;
        const pedido = { IDmesa, descripcion };
        let id_Pedido;
        try {
            const response = await createPedido(pedido);
            if (response.status === 'Client error') {
                console.log(response);
            } else {
                    console.log(response.data);
                id_Pedido=response.data.id;
            }
        } catch (error) {
            console.log(error);
        }
        const dataSolicitudes={id_Pedido,solicitudes};
        try{
            total= await createSolicitudes(dataSolicitudes);
            console.log(total);
        }catch(error){
            console.log(error);
        }
        try{
            const ped ={IDmesa,descripcion,total};
            const response = await updatePedido(ped,id_Pedido);
            if (response.status === 'Client error') {
                console.log(response);
            } 
        }catch(error){
            console.log(error);            
        }
    };

    return (
        <div>
            <main className="container h-auto">
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
                            label: "Plato de fondo",
                            name: "pF",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options: platosFondo
                        },
                        {
                            label: "Cantidad",
                            name: "c_pF",
                            type: "number",
                            min:0,
                            fieldType: "input",
                            required: true
                        },
                        {
                            label: "Entrada",
                            name: "entrada",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options: entradas
                        },
                        {
                            label: "Cantidad",
                            name: "c_Ent",
                            type: "number",
                            fieldType: "input",
                            required: true
                        },
                        {
                            label: "Bebida",
                            name: "bebida",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options: bebestibles
                        },
                        {
                            label: "Cantidad",
                            name: "c_Beb",
                            type: "number",
                            min:0,
                            fieldType: "input",
                            required: true
                        },
                        {
                            label: "Ensalada",
                            name: "ensalada",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options: ensaladas
                        },
                        {
                            label: "Cantidad",
                            name: "c_Ens",
                            type: "number",
                            min:0,
                            fieldType: "input",
                            required: true
                        },
                        {
                            label: "Postre",
                            name: "postre",
                            fieldType: 'select',
                            type: "input",
                            required: true,
                            options:postres
                        },
                        {
                            label: "Cantidad",
                            name: "c_Pos",
                            type: "number",
                            min:0,
                            fieldType: "input",
                            required: true
                        },
                        {   
                            label: `Total $ ${total}`,
                            name: "total",
                        }
                    ]}
                    buttonText="Crear Pedido"
                    onSubmit={submitPedido}
                    
                />
             </main>
            </div>
    );
};

export default Pedidos;