import { useCallback, useEffect, useState } from 'react';

import Table from "../components/Table";

import Search from '../components/Search';


import useSolicitud from '../hooks/tablaCocina/useGetCocina';
import useEditSolicitud from '../hooks/solicitud/useEditSolicitud';


import DeleteIcon from '../assets/deleteIcon.svg';
import gorritoChefAmarillo from '../assets/chefHatIconAmarillo.svg';
import gorritoChef from '../assets/chefHatIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { getSolicitudes } from '@services/cocinaConsulta.service.js';


//import { getCocinas } from '@services/cocinaConsulta.service.js';


const Cocineria = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  // Define fetchSolicitudes para poder llamarla donde sea necesario
  const fetchSolicitudes = async () => {
      try {
          const response = await getSolicitudes();
          const formattedData = response.map(cocina => ({
              id_Pedido: cocina.id_Pedido,
              id_Producto: cocina.id_Producto,
              fechacreacion: cocina.fechacreacion,
              descripcion: cocina.descripcion,
              mesa: cocina.mesa,
              producto: cocina.producto,
              cantidad: cocina.cantidad,
              estado: cocina.estado
          }));
          setSolicitudes(formattedData);
      } catch (error) {
          console.log("Error en fetchSolicitudes:", error);
      }
  };

  useEffect(() => {
      fetchSolicitudes(); // Cargar datos inicialmente
  }, []);



/*
  const [solicitudes, setSolicitudes] = useState([]);
  useEffect(() => {

    const fetchCocinas = async () => {
      try {

        const response = await getCocinas();
        const formattedData = response.map(cocina => ({
          id_Pedido: cocina.id_Pedido,
          id_Producto: cocina.id_Producto,
          fechacreacion: cocina.fechacreacion,
          descripcion: cocina.descripcion,
          mesa: cocina.mesa,
          producto: cocina.producto,
          cantidad: cocina.cantidad,
          estado: cocina.estado

        }));
        console.log("formattedData", formattedData);

        setSolicitudes(formattedData);

      } catch (error) {
        console.log("error en useCocina");
        console.error("Error: ", error);
      }
    }
    fetchCocinas();
  }, []);
*/

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
    { title: "ID pedido", field: "id_Pedido", width: 100, responsive: 0 },
    {title: "ID Producto", field: "id_Producto", width: 100, responsive: 0},
    { title: "Cantidad", field: "cantidad", width: 100, responsive: 1 },
  

    { title: "Estado", field: "estado", width: 100, responsive: 0, },
    { title: "producto", field: "producto", width: 200, responsive: 0 },
    { title: "Descripción", field: "descripcion", width: 250, responsive: 1 },

    { title: "Mesa", field: "mesa", width: 100, responsive: 2 },
    { title: "Creado", field: "fechacreacion", width: 100, responsive: 3 },

  ];


  return (
    <main>
        <div className="h-full w-full bg-gradient-to-r from-rose-100 to-[#FFC107] flex flex-col items-center p-10 space-y-8">
            <div className="bg-[#212121] p-12 rounded-3xl text-center text-rose-100 flex flex-col items-center space-y-4 my-11">
                <h1 className="text-3xl font-bold text-[#FFC107]">COCINA</h1>
                <h2 className="text-1xl font-light">Preparación de productos</h2>
            </div>

            <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
                    <div className="flex space-x-4 items-center">
                        <Search value={filterId} onChange={handleIdFilterChange} placeholder="Filtrar por ID" />
                        <button onClick={handleUpdateStatus} className="focus:outline-none bg-[#FFC107] px-10 py-2 rounded-lg">
                            <img src={gorritoChef} alt="edit" />
                        </button>
                        <button className="focus:outline-none bg-[#212121] px-10 py-2 rounded-lg">
                            <img src={DeleteIcon} alt="delete" />
                        </button>
                    </div>
                </div>
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
        </div>
    </main>
);

};

export default Cocineria;
