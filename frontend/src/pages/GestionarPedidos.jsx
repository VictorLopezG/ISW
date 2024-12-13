import { useCallback, useEffect, useState } from 'react';

import Table from "../components/Table";

import Search from '../components/Search';

import usePedido from '@hooks/pedidos/useGetPedido.jsx';
import useEditPedido from '@hooks/pedidos/useEditPedido.jsx';
import useDeletePedido from '@hooks/pedidos/useDeletePedido.jsx';

import DeleteIcon from '../assets/deleteIcon.svg';
import gorritoChefAmarillo from '../assets/chefHatIconAmarillo.svg';
import gorritoChef from '../assets/chefHatIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';

const Cocineria = () => {
  const { pedidos, fetchPedidos, setPedidos } = usePedido();
  

  const [filterId, setFilterId] = useState('');



  const {
    handleClickUpdate,
    handleUpdate,
    handleUpdateStatus,
    dataPedido,
    setDataPedido
  } = useEditPedido(setPedidos,"listo");



  const { handleDelete } = useDeletePedido(fetchPedidos, setDataPedido);

  
  //revisar
  useEffect(() => {
    fetchPedidos();
  }, [])


  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedPedidos) => {
    setDataPedido(selectedPedidos);
  }, [setDataPedido]);




  const columns = [
    { title: "ID", field: "id", width: 50, responsive: 0 },
    { title: "estado", field: "estado", width: 100, responsive: 0, },
    { title: "Descripción", field: "descripcion", width: 250, responsive: 1 },
    { title: "MesaID", field: "mesaID", width: 100, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 100, responsive: 3 },
    {title: "total", field: "total", width: 100, responsive: 4}

  ];



  return (
    <main>
      <div className="h-screen w-full flex items-center justify-center p-10 space-y-8">
        

        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-3  ">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
            <div className="flex space-x-4 items-center">
              <Search value={filterId} onChange={handleIdFilterChange} placeholder="Filtrar por ID" />


              <button onClick={handleUpdateStatus} 
                disabled={dataPedido.length === 0}
                className="focus:outline-none px-10 py-2 bg-[#212121] text-[#FFC107] font-bold rounded-lg hover:bg-[#FFC107] hover:text-[#212121] transition-all duration-300 ease-in-out"

              >
                <img src={dataPedido.length === 0 ? gorritoChefAmarillo : gorritoChef} alt="edit" />



              </button>

              <button onClick={() => handleDelete(dataPedido)} disabled={dataPedido.length === 0} className="focus:outline-none">
                <img src={dataPedido.length === 0 ? DeleteIconDisable : DeleteIcon} alt="delete" />
              </button>
            </div>
          </div>
          <Table
       
            data={pedidos}
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
