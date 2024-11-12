import { useCallback, useState } from 'react';

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

  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedPedidos) => {
    setDataPedido(selectedPedidos);
  }, [setDataPedido]);


  

  const columns = [
    { title: "ID", field: "id", width: 350, responsive: 0 },
    { title: "Descripción", field: "descripcion", width: 300, responsive: 3 },
    { title: "Total", field: "total", width: 150, responsive: 2 },
    {title: "Estado", field: "estado", width: 200, responsive: 2,},
    { title: "MesaID", field: "mesaID", width: 200, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 2 }
  ];
  

  return (
    <main>
      <div className="h-screen w-full bg-gradient-to-r from-rose-100 to-[#FFC107] flex flex-col items-center p-10 space-y-8">
        <div className="bg-[#212121] p-8 rounded-3xl text-center text-rose-100 flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-[#FFC107]">COCINA</h1>
          <h2 className="text-1xl font-light">Preparación de productos</h2>
        </div>

        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
            <div className="flex space-x-4 items-center">
              <Search value={filterId} onChange={handleIdFilterChange} placeholder="Filtrar por ID" />


              <button onClick={handleUpdateStatus} // Cambia el estado a "listo"
                  disabled={dataPedido.length === 0}
                  className="focus:outline-none px-10 py-2 bg-[#212121] text-[#212121] font-bold rounded-lg hover:bg-[#212121] hover:text-[#212121] transition-all duration-300 ease-in-out" 
                  
                  >

                <img src={dataPedido.length === 0 ? gorritoChefAmarillo : gorritoChefAmarillo} alt="edit" />

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

    {/* <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} /> */}



  


        
      </div>
    </main>
  );
};

export default Cocineria;
