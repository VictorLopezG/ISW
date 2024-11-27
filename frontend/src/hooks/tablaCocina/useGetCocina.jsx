import { useState, useEffect } from 'react';
import { getCocinas } from '@services/cocinaConsulta.service.js';

const useCocinas = async () => {
    const [cocinas, setCocinas] = useState([]);
    useEffect(() => {

        const fetchCocinas = async () => {
            try {

                const response = await getCocinas();
                


                const formattedData = response.map(cocina => ({


                    idpedido: cocina.idpedido,
                    fechacreacion: cocina.fechacreacion,
                    descripcion: cocina.descripcion,
                    mesa: cocina.mesa,
                    producto: cocina.producto,
                    cantidad: cocina.cantidad,
                    estado: cocina.estado

                }));
                console.log("formattedData", formattedData);

                setCocinas(formattedData);

            } catch (error) {
                console.log("error en useCocina");
                console.error("Error: ", error);
            }
        }
        fetchCocinas();

    }, []);


    return { cocinas, setCocinas };

};
export default useCocinas;