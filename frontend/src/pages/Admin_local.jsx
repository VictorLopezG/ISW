import { useCallback, useState } from 'react';

import Table from '../components/Table';
import Search from '../components/Search';
/*hooks */
import useEditProducto from '@hooks/productos/useEditProducto.jsx'
import useProducto from '@hooks/productos/useGetProductos.jsx'
import useCreateProducto from '../hooks/productos/useCreateProducto';
import useDeleteProducto from '../hooks/productos/useDeleteProducto';
/*Assets*/

import check from '../assets/check.svg';
import delete_icon from '../assets/deleteIcon.svg';
import update_icon from '../assets/updateIcon.svg'

const Admin_local = () => {

    const { fetchProductos, setProductos } = useProducto();
    const [filternombre, setFilternombre] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        valor: '',
        stock: ''
    });

    const togglePopup = () => { setShowPopup(!showPopup); };

    const { handleCreate } = useCreateProducto(fetchProductos);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };
    {/*Jp del futuro mata todo lo relacionado al subir y lo recreas para entender que hiciste*/ }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreate(newProduct);
        setNewProduct({ nombre: '', valor: '', stock: '' });
        togglePopup();
    };

    const {
        handleClickUpdate,
        handleUpdate,
        handleUpdateStatus,
        dataProducto,
        setDataProducto
    } = useEditProducto(setProductos);

    const { productos } = useProducto();

    const opcionesP = productos.map(producto => ({
        id: producto[0].id,
        nombre: producto[0].nombre,
        valor: producto[0].valor,
        stock: producto[0].stock
    }));

    const { handleDelete } = useDeleteProducto(fetchProductos, setDataProducto);

    const handleIdFilterChange = (e) => {
        setFilternombre(e.target.value);
    };


    const handleSelectionChange = useCallback((selectedProductos) => {
        setDataProducto(selectedProductos);
    }, [setDataProducto]);

    const columns = [
        { title: "ID", field: "id", width: 100, responsive: 0 },
        { title: "Nombre", field: "nombre", width: 200, responsive: 3 },
        { title: "Valor", field: "valor", width: 120, responsive: 2 },
        { title: "Stock", field: "stock", width: 120, responsive: 2 }
    ];

    return (
        <main>
            <div className="h-screen w-full bg-gradient-to-r from-rose-100 to-[#212121] flex flex-col items-center p-10">
                <div className="bg-[#eef7ff] p-10 rounded-3xl flex flex-col items-center space-y-4 mb-10">
                    <h1 className="text-5xl font-bold text-[#212121]">
                        Administracion de local
                    </h1>
                    <h2 className="text-2xl font-light text-[#212121]">
                        Elija una opcion
                    </h2>
                </div>

                <div className="flex-col flex items-center justify-center w-full">

                    <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-6">

                        <div className="flex flex-col items-end justify-between ">
                            <div className="flex space-x-4 items-center">
                                {/*
                                    Agregar la barra de busquede,recuerda ajustar el largo de esto, ademas
                                    validar que sean solo misnisculas en el backend
                                    */}
                                <Search value={filternombre} onChange={handleIdFilterChange} placeholder={"Filtrar por Nombre"} />

                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between ">

                            <div className="flex flex-row">
                                {/*Boton para agregar productos */}

                                <button
                                    onClick={togglePopup} // Llama a togglePopup para mostrar el pop-up
                                    className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2"
                                >
                                    <img src={check} alt="add" />
                                    <span>Agregar Producto</span>
                                </button>

                                {/*Boton para agregar eliminar prodcutos */}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2">
                                    <img src={delete_icon} alt="edit" />

                                    <span>Eliminar Producto</span>
                                </button>

                                {/*boton para actualizar un producto*/}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2">
                                    <img src={update_icon} alt="edit" />

                                    <span>Actualizar Producto</span>
                                </button>

                                {/*Boton para agregar el menu basicamente quedar disponible y actualizar los precios*/}

                                {/*boton para generar informes*/}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2">
                                    <img src={update_icon} alt="edit" />

                                    <span>Generar Informe</span>
                                </button>

                            </div>
                            <Table
                                data={opcionesP}
                                columns={columns}
                                filter={filternombre}
                                dataToFilter="nombre"
                                initialSortName="id"
                                onSelectionChange={handleSelectionChange}
                            />
                            {showPopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                                        <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h2>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {/* Campo para Nombre */}
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                                                <input
                                                    type="text"
                                                    name="nombre"
                                                    value={newProduct.nombre}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                    required
                                                />
                                            </div>

                                            {/* Campo para Valor */}
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2">Valor</label>
                                                <input
                                                    type="number"
                                                    name="valor"
                                                    value={newProduct.valor}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                    required
                                                />
                                            </div>

                                            {/* Campo para Stock */}
                                            <div>
                                                <label className="block text-gray-700 font-bold mb-2">Stock</label>
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    value={newProduct.stock}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                    required
                                                />
                                            </div>

                                            {/* Botones para Cancelar y Agregar */}
                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={togglePopup}
                                                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                                >
                                                    Agregar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Admin_local;