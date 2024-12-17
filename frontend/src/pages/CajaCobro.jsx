import { useEffect, useState, useCallback } from 'react';
import Taable from "../components/Table";
import Search from '../components/Search';

import useGetPedidoL from '@hooks/cajacobro/useGetPedidoL.jsx';
import useGetConsumo from '@hooks/cajacobro/useGetConsumo.jsx';
import useEditPedido from '@hooks/pedidos/useEditPedido.jsx';



import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"



import update_icon from '../assets/ViewIcon.svg';
import CartIcon2 from '../assets/CartIcon2.svg';


import { enviarMail } from '@/services/email.service';


const CajaCobro = () => {
  const [filterId, setFilterId] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pedido, setPedido] = useState(null); 
  const [emailError, setEmailError] = useState('');


  const { pedidosListos, fetchPedidosListos } = useGetPedidoL();
  useEffect(() => {
    fetchPedidosListos();
  }, []);


  const { consumo, fetchConsumo } = useGetConsumo(pedido?.id);

  const handleselectionChange = useCallback((selectedPedido) => {

    setPedido(selectedPedido[0]);
  }, []);

  const togglePopup = async () => {
    if (!isPopupOpen && pedido) {

      await fetchConsumo();

    }

    setIsPopupOpen((prev) => !prev);
    setInputValue(''); // Vaciar el input después de cerrar el popup
  };



  const columns = [

    { title: "Estado", field: "estado", width: 200, responsive: 2 },
    { title: "Mesa", field: "mesaID", width: 100, responsive: 0 },
    { title: "Creado", field: "createdAt", width: 200, responsive: 3 },
    { title: "Total", field: "total", width: 200, responsive: 1 },
  ];

  const columnsconsumo = [
    { title: "Producto", field: "nombre", width: 200, responsive: 3 },
    { title: "Cantidad", field: "cantidad", width: 150, responsive: 2 },
  ];

  /*------------------------------------logica para enviar correito y actualizar estado a pagado------------------------------------------------------------- */

  const [inputValue, setInputValue] = useState("")
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);


    if (value === '' || validateEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('Por favor, ingrese un correo electrónico válido.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const { handleUpdateStatus2 } = useEditPedido(setPedido, "Pagado", pedido?.id, fetchPedidosListos);

  const handleSubmit = async () => {
    if (!pedido) return;

    if (inputValue !== '' && !validateEmail(inputValue)) {
      setEmailError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    try {
      if (inputValue.length > 0) {
        const consumoFormateado = JSON.stringify(consumo.map(item => ({
          producto: item.nombre.charAt(0).toUpperCase() + item.nombre.slice(1),
          cantidad: item.cantidad,
          valor: item.precio
        })));

        await enviarMail(inputValue, "CyG.App", consumoFormateado + `Total: $${pedido.total}`);
      }

      await handleUpdateStatus2("Pagado", pedido.id);
      togglePopup();
      setInputValue('');
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  /**------------------------------------------------------------------------------------------------------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consumo.slice(indexOfFirstItem, indexOfLastItem);
  const nextPage = () => {
    if (currentPage < Math.ceil(consumo.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };



  return (
    <main>
      <div className="h-screen w-full flex items-center justify-center p-10 space-y-8">
        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg space-y-3">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#212121]">Pedidos</h1>
            <div className="flex space-x-4 items-center">
              <Search value={filterId} onChange={(e) => setFilterId(e.target.value)} placeholder="Filtrar por Mesa" />
              <button
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-full"
                onClick={togglePopup}
                disabled={!pedido}
              >
                <img src={update_icon} alt="edit" className="mr-2" />
                <span>Descripción</span>
              </button>

            </div>
          </div>
          <Taable
            data={pedidosListos}
            columns={columns}
            filter={filterId}
            dataToFilter="mesaID"
            initialSortName="mesaID"
            onSelectionChange={(data) => handleselectionChange(data)}
          />
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 space-y-4">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <p>Consumo del pedido seleccionado:</p>
              <Table>
                <TableCaption className="py-1">Consumo del pedido seleccionado</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead  className="py-1">Producto</TableHead>
                    <TableHead  className="py-1">Cantidad</TableHead>
                    <TableHead  className="text-right py-1">Precio c/u</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((invoice) => (
                    <TableRow key={invoice.id_}>
                      <TableCell className="font-medium py-1">{invoice.nombre}</TableCell>
                      <TableCell className="py-1">{invoice.cantidad}</TableCell>
                      <TableCell className="text-right py-1">{invoice.precio}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{pedido?.total || ''}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>

              <div className="flex justify-between items-center mt-4">
                <Button
                variant="outlined"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-1 text-black rounded hover:bg-gray-200"
                >
                  Anterior
                </Button>

                <span>
                  Página {currentPage} de {Math.ceil(consumo.length / itemsPerPage)}
                </span>

                <Button
                  variant="outlined"
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(consumo.length / itemsPerPage)}
                  className="px-4 py-1 text-black rounded hover:bg-gray-200"
                >
                  Siguiente
                </Button>
              </div>



              <Input
                type="email"
                placeholder="Email"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full"
                  
              />
              {emailError && <p className="text-red-500">{emailError}</p>}



              <button
                className="flex items-center px-4 py-2 bg-lime-500 text-white rounded-full  "
                onClick={handleSubmit}
                disabled={!pedido} >
                <img src={CartIcon2} alt="edit" className="mr-2" />
                <span>Pagar</span>
              </button>



              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                onClick={togglePopup}>
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
