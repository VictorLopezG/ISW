import { AppDataSource } from "../config/configDb.js";


export const getTablaDatosService = async () => {
    const query = `
    SELECT 
        
        s."id_Pedido",
        s."id_Producto",
        p."createdAt" AS fechaCreacion,
        p.descripcion AS descripcion,
        m.descripcion AS mesa,
        pr.nombre AS producto,
        s.cantidad AS cantidad,
        s.estado AS estado
    
    FROM pedidos p
    JOIN mesas m ON p."mesaID" = m.id  -- Asegúrate de usar el nombre correcto de la columna
    JOIN solicitudes s ON s."id_Pedido" = p.id
    JOIN productos pr ON s."id_Producto" = pr.id
    WHERE s.estado = 'pendiente';


    `;

    try {
        console.log("Iniciando consulta...");


        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);
        console.log("Consulta exitosa:");

        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
};


export const getPedidoListoService = async () => {
    const query = `
    SELECT * FROM pedidos WHERE estado = 'listo';
    `;

    try {
        console.log("Iniciando consulta...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const result = await AppDataSource.query(query);

        console.log("Consulta exitosa:");
        return result;
}
    catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}

export const getconsumoService = async (id_pedido) => {
    const query = `
    SELECT 
        s."id_Pedido",
        s."id_Producto",
        pr."valor",
        pr.nombre AS producto,
        s.cantidad AS cantidad
    FROM pedidos p
    JOIN mesas m ON p."mesaID" = m.id
    JOIN solicitudes s ON s."id_Pedido" = p.id
    JOIN productos pr ON s."id_Producto" = pr.id
    WHERE s."id_Pedido" = ${id_pedido};
    `;

    try {
        console.log("Iniciando consulta...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);

        
        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}