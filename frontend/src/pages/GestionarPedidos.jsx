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
  } = useEditPedido(setPedidos);



  const { handleDelete } = useDeletePedido(fetchPedidos, setDataPedido);

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
    { title: "ID", field: "id", width: 80, responsive: 0 },
    { title: "Estado", field: "estado", width: 100, responsive: 0, },

    { title: "Descripción", field: "descripcion", width: 250, responsive: 1 },
    { title: "MesaID", field: "mesaID", width: 100, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 100, responsive: 3 },

  ];





  return (
    <main>
      <div className="h-full w-full bg-gradient-to-r from-rose-100 to-[#FFC107] flex flex-col items-center p-10 space-y-8">
        <div className="bg-[#212121] p-7 rounded-3xl text-center text-rose-100 flex flex-col items-center space-y-4 my-0">
          <h1 className="text-2xl font-bold text-[#FFC107]">Pedidos</h1>
          <h2 className="text-1xl font-light">Eliminar pedidos</h2>
        </div>

        <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
            <div className="flex space-x-4 items-center">
              <Search value={filterId} onChange={handleIdFilterChange} placeholder="Filtrar por ID" />


              <button onClick={() => handleDelete(dataPedido)} disabled={dataPedido.length === 0} className="focus:outline-none bg-[#212121] px-10 py-2 rounded-lg">
                <img src={dataPedido.length === 0 ? DeleteIconDisable : DeleteIcon} alt="delete" />
              </button>
            </div>
          </div>
          <Table
            //para filtrar usar "pedidosFiltrados" en lugar de "pedidos", pero esto me da un error al intentar actualizar el estado de un pedido
            data={pedidos}
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
