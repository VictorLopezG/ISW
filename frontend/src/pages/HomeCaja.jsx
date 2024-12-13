import { useNavigate } from 'react-router-dom';

const Homecaja = () => {
  const navigate = useNavigate();

  return (
    <div className="flex  flex-col items-center justify-center space-y-9
                      min-h-screen">
      <button
        onClick={() => navigate('/pedidos')}
        className="bg-[#efefef] text-[#212121] font-bold py-5 px-7 rounded-3xl hover:bg-slate-400 
                   hover:text-black text-5xl w-64 h-64"
      >
        Tomar Orden
      </button>


      <button
        onClick={() => navigate('/CajaCobro')}
        className="bg-[#efefef] text-[#212121] font-bold py-5 px-7 rounded-3xl hover:bg-slate-400 
                   hover:text-black text-5xl w-64 h-64"
      >
        Ir a Caja de Cobro
      </button>

      <button
        onClick={() => navigate('/gestionarPedidos')}
        className="bg-[#efefef] text-[#212121] font-bold py-5 px-7 rounded-3xl hover:bg-slate-400 
                   hover:text-black text-5xl w-64 h-64"
      >
        Gestionar pedidos
      </button>
    </div>
    
  );
};
export default Homecaja;


  
  