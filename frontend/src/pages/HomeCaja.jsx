import { useNavigate } from 'react-router-dom';
import cookbook from '../assets/cookbookIcon.svg';
import CartIcon from '../assets/CartIcon.svg';
import CategoriesIcon from '../assets/CategoriesIcon.svg';


const Homecaja = () => {
  const navigate = useNavigate();

  return (
    <div className="flex  flex-row  items-center justify-center space-x-44
                      min-h-screen">
      
      <button
        onClick={() => navigate('/pedidos')}
        className="bg-[#efefef] text-[#212121] border-solid border-4 border-black py-5 px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-64 h-64 shadow-2xl "
                   
      >
        <img src={cookbook} alt="edit" />
        Tomar Orden
      </button>


      <button
        onClick={() => navigate('/CajaCobro')}
        className="bg-[#efefef] text-[#212121] border-solid border-4 border-black py-5 px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-64 h-64"
      >
        <img src={CartIcon} alt="edit" />
        Ir a Caja de Cobro
      </button>

    </div>

  );
};
export default Homecaja;



