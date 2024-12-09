import { useEffect, useState, useCallback } from 'react';
import Table from "../components/Table";
import Search from '../components/Search';
import useGetPedidoL from '@hooks/cajacobro/useGetPedidoL.jsx';

import useGetConsumo from '@hooks/cajacobro/useGetConsumo.jsx';

import PopupConsumo from '../components/PopupConsumo';

import update_icon from '../assets/ViewIcon.svg';
import { use } from 'react';

const CajaCobro = () => {
  const [filterId, setFilterId] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pedido, setPedido] = useState(null); // Estado para el pedido seleccionado

  // Obtener pedidos
  const { pedidosListos, fetchPedidosListos } = useGetPedidoL();
  useEffect(() => {
    fetchPedidosListos();
  }, []);

  // Hook para consumo
  const { consumo, fetchConsumo } = useGetConsumo(pedido?.id); // Hook depende del ID del pedido seleccionado

  const handleselectionChange = useCallback((selectedPedido) => {
    console.log("Pedido seleccionado:", selectedPedido[0]);
    setPedido(selectedPedido[0]); // Almacena el pedido seleccionado
  }, []);

  // Función para abrir/cerrar el popup
  const togglePopup = async () => {
    if (!isPopupOpen && pedido) {
      console.log("Fetching consumo para pedido:", pedido.id);
      await fetchConsumo(); // Realiza la solicitud cuando se abre el popup
    }
    setIsPopupOpen((prev) => !prev);
  };

  const columns = [
    { title: "ID", field: "id", width: 100, responsive: 3 },
    { title: "Estado", field: "estado", width: 100, responsive: 2 },
    { title: "MesaID", field: "mesaID", width: 100, responsive: 0 },
    { title: "Creado", field: "createdAt", width: 100, responsive: 3 },
    { title: "Total", field: "total", width: 200, responsive: 1 },
  ];

  const columnsconsumo = [
    { title: "Producto", field: "nombre", width: 100, responsive: 3 },
    { title: "Cantidad", field: "cantidad", width: 100, responsive: 2 },
  ];

  return (
    <main>
      <div className="h-screen w-full bg-[#FFC107] flex items-center justify-center p-10 space-y-8">
        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
            <div className="flex space-x-4 items-center">
              <Search value={filterId} onChange={(e) => setFilterId(e.target.value)} placeholder="Filtrar por ID" />
              <button
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-full"
                onClick={togglePopup}
                disabled={!pedido} // Deshabilita el botón si no hay un pedido seleccionado
              >
                <img src={update_icon} alt="edit" className="mr-2" />
                <span>Descripción</span>
              </button>
            </div>
          </div>
          <Table
            data={pedidosListos}
            columns={columns}
            filter={filterId}
            dataToFilter="id"
            initialSortName="id"
            onSelectionChange={(data) => handleselectionChange(data)}
          />
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <p>Consumo del pedido seleccionado:</p>
              <Table
                data={consumo}
                columns={columnsconsumo}
                filter={filterId}
                dataToFilter="id"
                initialSortName="id"
              />
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                onClick={togglePopup}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CajaCobro;
