import { useCallback, useEffect, useState } from 'react';

import Table from "../components/Table";

import Search from '../components/Search';



import useCocinas from '../hooks/solicitud/useGetCocina';
import useEditSolicitud from '../hooks/tablaCocina/useEditSolicitud';


import DeleteIcon from '../assets/deleteIcon.svg';
import gorritoChefAmarillo from '../assets/chefHatIconAmarillo.svg';
import gorritoChef from '../assets/chefHatIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';


import { getCocinas } from '@services/cocinaConsulta.service.js';


const Cocineria = () => {



  const [solicitudes, setSolicitudes] = useState([]);
  useEffect(() => {

    const fetchCocinas = async () => {
      try {

        const response = await getCocinas();
        const formattedData = response.map(cocina => ({
          idpedido: cocina.idpedido,
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


  const {
    handleClickUpdate,
    handleUpdate,
    handleUpdateStatus,
    DataSolicitud,
    setDataSolicitud
  } = useEditSolicitud(setSolicitudes);






  const handleSelectionChange = useCallback((selectedSolcitud) => {
    setDataPedido(selectedSolcitud);
  }, [setDataSolicitud]);


  //BUSCAR SOLICITUDES
  const [filterId, setFilterId] = useState('');
  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const columns = [
    { title: "ID", field: "idpedido", width: 50, responsive: 0 },
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

              <button className="focus:outline-none bg-[#FFC107] px-10 py-2 rounded-lg">
                <img src={gorritoChef} alt="delete" />
              </button>




              <button className="focus:outline-none bg-[#212121] px-10 py-2 rounded-lg"
              >
                <img src={DeleteIcon} alt="delete" />
              </button>








            </div>
          </div>
          <Table

            data={solicitudes}
            columns={columns}
            filter={filterId}
            dataToFilter="id"
            initialSortName="id"
            onSelectionChange={handleSelectionChange}


          />
        </div>

        {/* <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} /> */}


      </div>
    </main>
  );
};

export default Cocineria;
