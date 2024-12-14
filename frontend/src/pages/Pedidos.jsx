import { createPedido } from '@services/pedido.service.js';
import Form from '@components/Form';
import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import { createSolicitud } from '../services/solicitud.service';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { useState } from 'react';
import { updateProducto } from '@/services/producto.service';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

let total = 0;
let id_Pedido=-1;
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

    const handlecreateclick = async (data) => {
        const { valor, label, stock } = await disponibles.find(prod => prod.value == data.id_Producto);
        if (data.cantidad > stock) {
            showErrorAlert("No hay suficiente Stock",`El stock restante de ${label} es de ${stock}`);
            //console.log("no hay suficiente stock del producto");
            return;
        }
        const sol = { id_Producto: data.id_Producto, cantidad: data.cantidad, precio: valor, nombre: label };
        // Verificar si el producto ya existe en solicitudes
        const updatedSolicitudes = solicitudes.map((solicitud) => {
            if (solicitud.id_Producto === sol.id_Producto) {
                if (sol.cantidad > 0) {
                    return { ...solicitud, cantidad: sol.cantidad }; // Actualizar cantidad
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
        total = 0;
        updatedSolicitudes.map(a => { total += a.precio * a.cantidad });
        //console.log(updatedSolicitudes);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Puedes ajustar la cantidad de ítems por página

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = solicitudes.slice(indexOfFirstItem, indexOfLastItem);
    const nextPage = () => {
        if (currentPage < Math.ceil(solicitudes.length / itemsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const { mesas } = useMesas();

    const opcionesM = mesas.map(mesa => ({
        value: mesa.id,
        label: mesa.descripcion
    }));

    const submitPedido = async (data) => {
        const { IDmesa, descripcion } = data;
        if (solicitudes.length!==0) {
            const pedido = { IDmesa, descripcion, total };
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
        }else{
            showErrorAlert("Pedido vacio","Primero debe seleccionar un producto");
            return;
        }
        for (let i = 0; i < solicitudes.length; i++) {
            const { id_Producto, cantidad } = solicitudes.at(i);
            try {
                const { label, stock, categoria, precio } = await disponibles.find(prod => prod.value == id_Producto);
                await createSolicitud({ id_Pedido, id_Producto, cantidad, estado: 'pendiente' });
                await updateProducto({ nombre: label, valor: precio, stock: stock - cantidad, categoria: categoria }, id_Producto)
                //console.log({ id_Pedido, id_Producto, cantidad });
                showSuccessAlert("Pedido registrado",`Total del pedido $${total}`); 
            } catch (error) {
                console.error(error);
            }
        }
        id_Pedido = -1;
        total = 0;
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
                            name: 'id_Producto',
                            required:true
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
                <div class="bg-[#efefef] bg-opacity-95 p-3 rounded-3xl flex flex-col items-center space-y-2 w-3/5 border-solid border-2 border-black">
                    <strong><h3>Pedido</h3></strong>
                    <Table>
                        <TableCaption>*NOTA: para quitar un producto del pedido seleccionelo con cantidad 0</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="py-1 font-bold">Producto</TableHead>
                                <TableHead className="py-1 font-bold">Cantidad</TableHead>
                                <TableHead className="text-right py-1 font-bold">Valor</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentItems.map((invoice) => (
                                <TableRow key={invoice.label}>
                                    <TableCell className="font-medium">{invoice.nombre}</TableCell>
                                    <TableCell className="">{invoice.cantidad}</TableCell>
                                    <TableCell className="text-right ">{invoice.precio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="outlined"
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-1 text-black rounded hover:bg-gray-200"
                        >
                            Anterior
                        </Button>

                        <span>
                            Página {currentPage} de {Math.ceil(solicitudes.length / itemsPerPage)}
                        </span>

                        <Button
                            variant="outlined"
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(solicitudes.length / itemsPerPage)}
                            className="px-4 py-1 text-black rounded hover:bg-gray-200"
                        >
                            Siguiente
                        </Button>
                        <strong><h1>    Total: ${total} </h1></strong>
                    </div>
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