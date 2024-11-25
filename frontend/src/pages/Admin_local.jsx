import { useCallback, useState } from 'react';

import Table from '../components/Table';
import Search from '../components/Search';
/*hooks */
import useEditProducto from '@hooks/productos/useEditProducto.jsx'
import useProducto from '@hooks/productos/useGetProductos.jsx'
import useCreateProducto from '@hooks/productos/useCreateProducto';
import useDeleteProducto from '../hooks/productos/useDeleteProducto';
/*Assets*/

import check from '../assets/check.svg';

const Admin_local = () => {
    const { fetchProductos, setProductos } = useProducto();
    const [filterId, setFilterId] = useState('');

    const {
        handleClickUpdate,
        handleUpdate,
        handleUpdateStatus,
        dataProducto,
        setDataProducto
    } = useEditProducto(setProductos);

    const { productos } = useProducto();
    const opcionesP = productos.map(producto => ({
        id: producto.id,
        nombre: producto.nombre,
        valor: producto.valor,
        stock: producto.stock
    }));

    const { handleDelete } = useDeleteProducto(fetchProductos, setDataProducto);

    const handleIdFilterChange = (e) => {
        setFilterId(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedProductos) => {
        setDataProducto(selectedProductos);
    }, [setDataProducto]);

    const columns = [
        { title: "ID", field: "id", width: 100, responsive: 0 },
        { title: "Nombre", field: "nombre", width: 100, responsive: 3 },
        { title: "Valor", field: "valor", width: 100, responsive: 2 },
        { title: "Stock", field: "stock", width: 100, responsive: 2 }
    ];

    return (
        <main>
            <div className="h-screen w-full bg-gradient-to-r from-rose-100 to-[#212121] flex flex-col items-center p-10">
                <div className="bg-[#eef7ff] p-10 rounded-3xl flex flex-col items-center space-y-4 mb-10">
                    <h1 className="text-5xl font-bold text-[#212121]">
                        Administracion de local
                    </h1>
                    <h2 className="text-2xl font-light text-[#212121]">
                        Elige el recurso a gestionar
                    </h2>
                </div>

                <div className="flex-col flex items-center justify-center w-full">

                    <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-6">

                        <div className="flex flex-col items-start justify-between ">
                            {/*Boton para agregar productos o eliminar prodcutos*/}

                            <button className="flex flex-col items-center px-4 py-2 bg-purple-500 text-white rounded space-x-2">
                                <img src={check} alt="edit" />

                                <span>Gestionar Productos</span>
                            </button>
                            {/*Boton para agregar el menu basicamente quedar disponible y actualizar los precios*/}

                            {/*boton para generar informes*/}

                            <Table
                                data={opcionesP}
                                columns={columns}
                                filter={filterId}
                                dataToFilter="id"
                                initialSortName="id"
                                onSelectionChange={handleSelectionChange}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Admin_local;