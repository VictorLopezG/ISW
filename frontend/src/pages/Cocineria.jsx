import { useCallback, useEffect, useState } from 'react';
import Table from "../components/Table";
import Search from '../components/Search';
import useSolicitud from '../hooks/tablaCocina/useGetCocina';
import useEditSolicitud from '../hooks/solicitud/useEditSolicitud';
import useDeleteSolicitud from '../hooks/solicitud/useDeleteSolicitud.jsx';
import DeleteIcon from '../assets/deleteIcon.svg';
import gorritoChefAmarillo from '../assets/chefHatIconAmarillo.svg';
import gorritoChef from '../assets/chefHatIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { getSolicitudes } from '@services/cocinaConsulta.service.js';



const Cocineria = () => {
    const [solicitudes, setSolicitudes] = useState([]);


    const fetchSolicitudes = async () => {
        const fechaActual= new Date();
        const opciones = { month: 'numeric', day: 'numeric' , hour: 'numeric', minute: 'numeric'};



        try {
            const response = await getSolicitudes();
            const formattedData = response.map(cocina => ({
                id_Pedido: cocina.id_Pedido,
                id_Producto: cocina.id_Producto,
                fechacreacion: new Date(cocina.fechacreacion).toLocaleDateString("es-ES",opciones),
                descripcion: cocina.descripcion,
                mesa: cocina.mesa,
                producto: cocina.producto,
                cantidad: cocina.cantidad,
                estado: cocina.estado
            }));
            setSolicitudes(formattedData);
        } catch (error) {
            console.log("Error en fetchSolicitudes:", error);
        }
    };

    useEffect(() => {
        fetchSolicitudes(); 
    }, []);

    const {
        handleUpdateStatus,
        DataSolicitud,
        setDataSolicitud,
        handleDelete
    } = useEditSolicitud(fetchSolicitudes);

   
    const [filterId, setFilterId] = useState('');
    const handleIdFilterChange = (e) => {
        setFilterId(e.target.value);
    };

    const handleSelectionChange = useCallback((selectedSolicitud) => {
     
        setDataSolicitud(selectedSolicitud);
    }, [setDataSolicitud]);

 






    const columns = [
      
  
        { title: "Cantidad", field: "cantidad", width: 100, responsive: 1 },


        { title: "Estado", field: "estado", width: 100, responsive: 0, },
        { title: "producto", field: "producto", width: 200, responsive: 0 },
        { title: "Descripción", field: "descripcion", width: 250, responsive: 1 },
        { title: "Hora", field: "fechacreacion", width: 100, responsive: 1 },

        { title: "Mesa", field: "mesa", width: 50, responsive: 2 },


    ];


    return (
        <main>
            <div className="h-screen w-full  flex flex-col  justify-center items-center p-20 space-y-2">
                <div className="w-full max-w-5xl bg-[#ffffff] p-8 rounded-xl shadow-lg space-y-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-[#212121]">Preparación</h1>
                        <div className="flex space-x-4 items-center">
                            <Search value={filterId} onChange={handleIdFilterChange} placeholder="Filtrar por Mesa" />
                            
                            <button onClick={handleUpdateStatus} className="focus:outline-none bg-[#ffcc33] px-10 py-2 rounded-lg">
                                <img src={gorritoChef} alt="edit" />


                            </button>
                            <button
                                className="focus:outline-none bg-[#212121] px-10 py-2 rounded-lg"
                                onClick={() => handleDelete(DataSolicitud)}
                            >
                                <img src={DeleteIcon} alt="delete" />
                            </button>
                        </div>
                    </div>
                    <Table

                        data={solicitudes}
                        columns={columns}
                        filter={filterId}
                        dataToFilter="mesa"
                        initialSortName="mesa"
                        onSelectionChange={(selectedData) => {
                            console.log("Datos seleccionados desde la tabla:", selectedData);
                            handleSelectionChange(selectedData); 
                        }}
                    />
                </div>
            </div>
        </main>
    );

};

export default Cocineria;
