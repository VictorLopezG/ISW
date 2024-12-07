import { useCallback, useEffect, useState } from 'react';
import Table from "../components/Table";
import Search from '../components/Search';
import useGetPedidoL from '@hooks/cajacobro/useGetPedidoL.jsx';

import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import update_icon from '../assets/ViewIcon.svg';


const CajaCobro = () => {
  //filtrar id
  const [filterId, setFilterId] = useState('');
  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  //getall
  const { pedidosListos, fetchPedidosListos, setPedidosListos } = useGetPedidoL();











  
  useEffect(() => {
    fetchPedidosListos();
  }, []);



  const columns = [
    { title: "ID", field: "id", width: 100, responsive: 3 },
    { title: "estado", field: "estado", width: 100, responsive: 2, },

    { title: "MesaID", field: "mesaID", width: 100, responsive: 0 },
    { title: "Creado", field: "createdAt", width: 100, responsive: 3 },
    { title: "total", field: "total", width: 200, responsive: 1 }

  ];
  return (
    <main>
      <div className="h-screen w-full bg-[#FFC107] flex items-center justify-center p-10 space-y-8">


        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-3  ">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
            <div className="flex space-x-4 items-center">
              <Search value={filterId} onChange={handleIdFilterChange} placeholder="Filtrar por ID" />

              <button className="flex flex-auto rounded-full items-center px-2 py-2 bg-gray-600 text-white space-x-4 mr-2"
                onClick={() => { }}

              >

                <img src={update_icon} alt="edit" />
                <span>Descripción</span>
              </button>


            </div>
          </div>
          <Table
            //para filtrar usar "pedidosFiltrados" en lugar de "pedidos", pero esto me da un error al intentar actualizar el estado de un pedido
            data={pedidosListos}
            columns={columns}
            filter={filterId}
            dataToFilter="id"
            initialSortName="id"
            onSelectionChange={(data) => {
              console.log(data);
            }}

          />
        </div>

        {/* <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} /> */}


      </div>
    </main>
  );
};

export default CajaCobro;
