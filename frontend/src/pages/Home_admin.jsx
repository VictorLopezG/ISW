import { useNavigate } from 'react-router-dom';
import cookbook from '../assets/cookbookIcon.svg';

const homeAdmin = () => {
    const navigate = useNavigate();


    return (
        <div className="flex  flex-col items-center justify-center space-y-9
                        min-h-screen ">

            <div className='flex flex-row items-center justify-center space-x-44'>
                <button
                    onClick={() => navigate('/Admin_local')}
                    className="bg-[#efefef] text-[#212121] border-solid border-4 border-black px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-52 h-52 shadow-2xl "

                >
                    <img src={cookbook} alt="edit" />
                    Gestionar productos
                </button>



                <button
                    onClick={() => navigate('/Admin_mesas')}
                    className="bg-[#efefef] text-[#212121] border-solid border-4 border-black py-5 px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-52 h-52 shadow-2xl "

                >
                    <img src={cookbook} alt="edit" />
                    Gestionar Mesas
                </button>

                <button
                    onClick={() => navigate('/ranking')}
                    className="bg-[#efefef] text-[#212121] border-solid border-4 border-black py-5 px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-52 h-52 shadow-2xl "

                >
                    <img src={cookbook} alt="edit" />
                    Ranking
                </button>


            </div>

            <div className='flex flex-row items-center justify-center space-x-44'>

                <button
                    onClick={() => navigate('/users')}
                    className="bg-[#efefef] text-[#212121] border-solid border-4 border-black py-5 px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-52 h-52 shadow-2xl "

                >
                    <img src={cookbook} alt="edit" />
                    Users
                </button>

                <button
                    onClick={() => navigate('/register')}
                    className="bg-[#efefef] text-[#212121] border-solid border-4 border-black py-5 px-7 rounded-3xl hover:bg-[#CDCDCD] 
                   hover:text-black text-1xl w-52 h-52 shadow-2xl "

                >
                    <img src={cookbook} alt="edit" />
                    Registrar
                </button>



            </div>

        </div>


    );



};
export default homeAdmin;