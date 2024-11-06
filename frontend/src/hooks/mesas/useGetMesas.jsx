import { useState, useEffect } from 'react';
import { getMesas } from '@services/mesa.service.js';

const useMesas = () => {
    const [mesas, setMesas] = useState([]);

    const fetchMesas = async () => {
        try {
            const response = await getMesas();
            //console.log(response.data); 
            const formattedData = response.data.map(mesa => ([{
                descripcion: mesa.descripcion,
                id: mesa.id,
                capacidad: mesa.capacidad,
                //createdAt: mesa.createdAt
            }]));
            setMesas(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    return { mesas, fetchMesas, setMesas };
};

export default useMesas;