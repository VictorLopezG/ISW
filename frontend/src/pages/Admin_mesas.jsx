import { useCallback, useEffect, useState } from 'react';

import Table from '../components/Table';
import Search from '../components/Search';
import Popupproducto from '../components/PopupProducto';
import PopupNuevoProducto from '../components/PopupNuevoProducto';

import useMesas from '@hooks/mesas/useGetMesas.jsx';
import useEditmesas from '@hooks/mesas/useEditMesas.jsx';
import useDeleteProducto from '../hooks/productos/useDeleteProducto';


import check from '../assets/check.svg';
import delete_icon from '../assets/deleteIcon.svg';
import update_icon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { getMesas } from '@services/mesa.service.js';

const Admin_mesas = () => {
    const[Mesas, setMesas] = useState([]);

    const fetchMesas = async () => {
        try {
            const response = await getMesas();
            const formattedData = response.data.map(mesa => ({
                id: mesa.id,
                descripcion: mesa.descripcion,
                capacidad: mesa.capacidad,
                //createdAt: mesa.createdAt
                
            }));
            console.log(formattedData);
            setMesas(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchMesas(); 
    }, []);




    const [filternombre, setFilternombre] = useState('');
    const [iscreatePopupopen, setIscreatePopupopen] = useState(false);

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataMesas,
        setDataMesas
    } = useEditmesas(setMesas);

    const handlecreateclick = () => {
        setIscreatePopupopen(true);
    }

    const {

        handleDelete

    } = useDeleteProducto(fetchMesas, setDataMesas);

    const handleIdFilterChange = (e) => {
        setFilternombre(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedMesas) => {
        setDataMesas(selectedMesas);
    }, [setDataMesas]);

    const columns = [
        { title: "ID", field: "id", width: 100, responsive: 0 },
        { title: "Descripcion", field: "descripcion", width: 200, responsive: 0 },
        { title: "Capacidad", field: "capacidad", width: 120, responsive: 0 },

    ];

    return (
        <main>
            <div className="h-full w-full bg-gradient-to-r from-rose-100 to-[#212121] flex flex-col items-center p-10">
                <div className="bg-[#eef7ff] p-10 rounded-3xl flex flex-col items-center space-y-4 mb-10">
                    <h1 className="text-5xl font-bold text-[#212121]">
                        Administracion de Mesas
                    </h1>
                    <h2 className="text-2xl font-light text-[#212121]">
                        Elija una opcion
                    </h2>
                </div>

                <div className="flex-col flex items-center justify-center w-full">

                    <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-6">

                        <div className="flex flex-col items-end justify-between ">
                            <div className="flex space-x-4 items-center">
                                <Search value={filternombre} onChange={handleIdFilterChange} placeholder={"Filtrar por Descripcion"} />

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
                                    onClick={() => handleDelete(dataMesas)} disabled={dataMesas.length === 0}
                                >
                                    {dataMesas.length === 0 ? (
                                        <img src={DeleteIconDisable} alt="edit-disabled" />
                                    ) : (
                                        <img src={delete_icon} alt="edit" />
                                    )}

                                    <span>Eliminar Producto</span>
                                </button>

                                {/*boton para actualizar un producto*/}

                                <button className="flex flex-auto items-center px-2 py-2 bg-gray-600 text-white rounded space-x-4 mr-2"
                                    onClick={handleClickUpdate} disabled={dataMesas.length === 0}
                                >
                                    {dataMesas.length === 0 ? (
                                        <img src={UpdateIconDisable} alt="edit-disabled" />
                                    ) : (
                                        <img src={update_icon} alt="edit" />
                                    )}


                                    <span>Actualizar Producto</span>
                                </button>
                            </div>
                            <Table
                                data={Mesas}
                                columns={columns}
                                filter={filternombre}
                                dataToFilter="descripcion"
                                initialSortName="id"
                                onSelectionChange={handleSelectionChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Popupproducto show={isPopupOpen} setShow={setIsPopupOpen} data={dataMesas} action={handleUpdate} />
            <PopupNuevoProducto show={iscreatePopupopen} setShow={setIscreatePopupopen} action={fetchMesas} />
        </main>
    );
};

export default Admin_mesas;
