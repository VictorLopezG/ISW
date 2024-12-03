import { useState, useEffect } from 'react';
import { getSolicitudes } from '@services/cocinaConsulta.service.js';

const useSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    
        const fetchSolicitudes = async () => {
            try {
                const response = await getSolicitudes();
                const formattedData = response.map(solicitud => ({
                    id_Pedido: solicitud.id_Pedido,
                    id_Producto: solicitud.id_Producto,
                    fechacreacion: solicitud.fechacreacion,
                    descripcion: solicitud.descripcion,
                    mesa: solicitud.mesa,
                    producto: solicitud.producto,
                    cantidad: solicitud.cantidad,
                    estado: solicitud.estado
                }));
                setSolicitudes(formattedData);
            } catch (error) {
                console.error("Error al obtener cocinas: ", error);
                setError(error);
            }
        };

            

    return { solicitudes, setSolicitudes, fetchSolicitudes };
};

export default useSolicitudes;
