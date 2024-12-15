import { useNavigate } from 'react-router-dom';

const homeAdmin = () => {
    const navigate = useNavigate();


    return (
        <div className="flex  flex-col items-center justify-center space-y-9
                        min-h-screen ">
            <button
                onClick={() => navigate('/Admin_local')}
                className="bg-[#212121] text-white font-bold py-5 px-7 rounded-3xl hover:bg-[#FF5722] 
                        hover:text-black text-5xl "
            >
                Gestionar productos
            </button>


            <button
                onClick={() => navigate('/Admin_mesas')}
                className="bg-[#212121] text-white font-bold py-5 px-7 rounded-3xl hover:bg-[#FF5722] 
                        hover:text-black text-5xl "
            >
                Gestionar Mesas
            </button>

            <button
                onClick={() => navigate('/ranking')}
                className="bg-[#212121] text-white font-bold py-5 px-7 rounded-3xl hover:bg-[#FF5722] 
                        hover:text-black text-5xl "
            >
                Ranking
            </button>
            
        </div>


    );



};
export default homeAdmin;