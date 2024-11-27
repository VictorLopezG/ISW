import { AppDataSource } from "../config/configDb.js"; // Asegúrate de importar el archivo que contiene la configuración de la conexión

export const getTablaDatosService = async () => {
    const query = `
    SELECT 
        p.id AS idPedido,
        p."createdAt" AS fechaCreacion,
        p.descripcion AS descripcion,
        m.descripcion AS mesa,
        pr.nombre AS producto,
        s.cantidad AS cantidad,
        s.estado AS estado
    FROM pedidos p
    JOIN mesas m ON p."mesaID" = m.id  -- Asegúrate de usar el nombre correcto de la columna
    JOIN solicitudes s ON s."id_Pedido" = p.id
    JOIN productos pr ON s."id_Producto" = pr.id;

    `;

    try {
        console.log("Iniciando consulta...");

        // Asegúrate de que la conexión esté inicializada
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        // Ejecuta la consulta con AppDataSource.query()
        const result = await AppDataSource.query(query);
        console.log("Consulta exitosa:", result);

        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
};
