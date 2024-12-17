import { AppDataSource } from "../config/configDb.js";


export const getPDFDiaService = async () => {
    const query = `
    SELECT 
    
    pr.nombre AS producto,
    pr.valor AS valor,
    s.cantidad AS cantidad
    

FROM pedidos p 
JOIN solicitudes s ON s."id_Pedido" = p.id
JOIN productos pr ON s."id_Producto" = pr.id
WHERE p.estado = 'Pagado' 
and p."updatedAt"::DATE = current_date 
;
`;
    try {
        console.log("Iniciando consulta");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const consult = await AppDataSource.query(query);
        return consult;
    } catch (error) {
        console.error("Error al ejecutar la consulta del dia:", error)
        return [null, "Error interno del servidor"];
    }
}

export const getPDFSemanaService = async () => {
    const query = `
    SELECT pr.nombre AS producto, pr.valor AS valor, s.cantidad AS cantidad 
    FROM pedidos p JOIN solicitudes s ON s."id_Pedido" = p.id 
    JOIN productos pr ON s."id_Producto" = pr.id 
    WHERE p.estado = 'Pagado' 
    AND p."updatedAt" >= DATE_TRUNC('week', CURRENT_DATE) 
    AND p."updatedAt" < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week' 
;
`;
    try {
        console.log("Iniciando consulta");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const consult = await AppDataSource.query(query);
        return consult;
    } catch (error) {
        console.error("Error al ejecutar la consulta del dia:", error)
        return [null, "Error interno del servidor"];
    }
}

export const getPDFmesService = async () => {
    const query = `
    SELECT pr.nombre AS producto, pr.valor AS valor, s.cantidad AS cantidad 
    FROM pedidos p JOIN solicitudes s ON s."id_Pedido" = p.id 
    JOIN productos pr ON s."id_Producto" = pr.id 
    WHERE p.estado = 'Pagado' 
    AND p."updatedAt" >= DATE_TRUNC('week', CURRENT_DATE) 
    AND p."updatedAt" < DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '1 week' 
;
`;
    try {
        console.log("Iniciando consulta");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const consult = await AppDataSource.query(query);
        return consult;
    } catch (error) {
        console.error("Error al ejecutar la consulta del dia:", error)
        return [null, "Error interno del servidor"];
    }
}

export const getPDFanoService = async () => {
    const query = `
    SELECT pr.nombre AS producto, pr.valor AS valor, s.cantidad AS cantidad 
    FROM pedidos p JOIN solicitudes s ON s."id_Pedido" = p.id 
    JOIN productos pr ON s."id_Producto" = pr.id 
    WHERE p.estado = 'Pagado' 
    AND p."updatedAt" >= DATE_TRUNC('year', CURRENT_DATE) 
    AND p."updatedAt" < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year';

`;
    try {
        console.log("Iniciando consulta");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const consult = await AppDataSource.query(query);
        return consult;
    } catch (error) {
        console.error("Error al ejecutar la consulta del dia:", error)
        return [null, "Error interno del servidor"];
    }
}