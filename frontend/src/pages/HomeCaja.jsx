import { useNavigate } from 'react-router-dom';

const Homecaja = () => {
  const navigate = useNavigate();

  return (
    <div className="flex  flex-col items-center justify-center space-y-9
                      min-h-screen bg-gradient-to-r from-rose-100 to-[#FFC107]">
      <button
        onClick={() => navigate('/pedidos')}
        className="bg-[#212121] text-white font-bold py-5 px-7 rounded-3xl hover:bg-[#FF5722] 
                   hover:text-black text-5xl "
      >
        Tomar Orden
      </button>


      <button
        onClick={() => navigate('/CajaCobro')}
        className="bg-[#212121] text-white font-bold py-5 px-7 rounded-3xl hover:bg-[#FF5722] 
                   hover:text-black text-5xl "
      >
        Ir a Caja de Cobro
      </button>

      <button
        onClick={() => navigate('/gestionarPedidos')}
        className="bg-[#212121] text-white font-bold py-5 px-7 rounded-3xl hover:bg-[#FF5722] 
                   hover:text-black text-5xl "
      >
        Eliminar pedidos
      </button>
    </div>
    
  );
};
export default Homecaja;


  
  