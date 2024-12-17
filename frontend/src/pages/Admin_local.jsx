import { useCallback, useState } from 'react';

import Table from '../components/Table';
import Search from '../components/Search';
import Popupproducto from '../components/PopupProducto';
import PopupNuevoProducto from '../components/PopupNuevoProducto';
/*hooks */
import useEditProducto from '@hooks/productos/useEditProducto.jsx';
import useProducto from '@hooks/productos/useGetProductos.jsx';
import useDeleteProducto from '../hooks/productos/useDeleteProducto';
import { PDFDelDia }  from '@services/PDF.service.js'
/*Assets*/

import check from '../assets/check.svg';
import delete_icon from '../assets/deleteIcon.svg';
import update_icon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';

/*Revisar bien las validaciones o mensajes que devuelven en crear producto y actualizar*/ 

const Admin_local = () => {

    const { productos, fetchProductos, setProductos } = useProducto();
    const [filternombre, setFilternombre] = useState('');
    const [iscreatePopupopen,setIscreatePopupopen] = useState(false);
    

    

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProducto,
        setDataProducto
    } = useEditProducto(setProductos);

    const handlecreateclick = () =>{
        setIscreatePopupopen(true);
    }

    const {
        handleDelete
    } = useDeleteProducto(fetchProductos, setDataProducto);

    const handleIdFilterChange = (e) => {
        setFilternombre(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedProductos) => {
        setDataProducto(selectedProductos);
    }, [setDataProducto]);

    const columns = [
        { title: "ID", field: "id", width: 100, responsive: 0 },
        { title: "Nombre", field: "nombre", width: 200, responsive: 0 },
        { title: "Valor", field: "valor", width: 120, responsive: 0 },
        { title: "Stock", field: "stock", width: 120, responsive: 0 },
        { title: "Categoria", field: "categoria", width: 200, responsive: 0 }
    ];

    return (
        <main>
            <div className="h-full w-full flex flex-col items-center p-10">
                <div className="bg-[#eef7ff] p-10 rounded-3xl flex flex-col items-center space-y-4 mb-10">
                    <h1 className="text-5xl font-bold text-[#212121]">
                        Administracion de Productos
                    </h1>
                    <h2 className="text-2xl font-light text-[#212121]">
                        Elija una opcion
                    </h2>
                </div>

                <div className="flex-col flex items-center justify-center w-full">

                    <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-6">

                        <div className="flex flex-col items-end justify-between ">
                            <div className="flex space-x-4 items-center">
                                <Search value={filternombre} onChange={handleIdFilterChange} placeholder={"Filtrar por Nombre"} />

                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between ">

                            <div className="flex flex-row">
                                {/*Boton para agregar productos */}

                                <button
                                    // Llama a togglePopup para mostrar el pop-up
                                    className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2"
                                    onClick={handlecreateclick}
                                >
                                    <img src={check} alt="add" />
                                    <span>Agregar Producto</span>
                                </button>

                                {/*Boton para agregar eliminar prodcutos */}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2"
                                    onClick={() => handleDelete(dataProducto)} disabled={dataProducto.length === 0}
                                >
                                    {dataProducto.length === 0 ? (
                                        <img src={DeleteIconDisable} alt="edit-disabled" />
                                    ) : (
                                        <img src={delete_icon} alt="edit" />
                                    )}

                                    <span>Eliminar Producto</span>
                                </button>

                                {/*boton para actualizar un producto*/}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2"
                                    onClick={handleClickUpdate} disabled={dataProducto.length === 0}
                                >   
                                    {dataProducto.length === 0 ? (
                                        <img src={UpdateIconDisable} alt="edit-disabled" />
                                    ) : (
                                        <img src={update_icon} alt="edit" />
                                    )}


                                    <span>Actualizar Producto</span>
                                </button>

                                {/*Boton para agregar el menu basicamente quedar disponible y actualizar los precios*/}

                                {/*boton para generar informes*/}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2"
                                    onClick={PDFDelDia}
                                >       
                                        <img src={update_icon} alt="edit" />

                                    <span>Generar Informe</span>
                                </button>

                            </div>
                            <Table
                                data={productos}
                                columns={columns}
                                filter={filternombre}
                                dataToFilter="nombre"
                                initialSortName="id"
                                onSelectionChange={handleSelectionChange}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <Popupproducto show={isPopupOpen} setShow={setIsPopupOpen} data={dataProducto} action={handleUpdate} />
            <PopupNuevoProducto show={iscreatePopupopen} setShow={setIscreatePopupopen} action={fetchProductos}/>
        </main>
    );
};

export default Admin_local;
