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
    SELECT 
    pr.nombre AS producto, 
    pr.valor AS valor, 
    s.cantidad AS cantidad,
    CASE 
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 1 THEN 'Enero'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 2 THEN 'Febrero'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 3 THEN 'Marzo'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 4 THEN 'Abril'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 5 THEN 'Mayo'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 6 THEN 'Junio'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 7 THEN 'Julio'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 8 THEN 'Agosto'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 9 THEN 'Septiembre'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 10 THEN 'Octubre'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 11 THEN 'Noviembre'
        WHEN EXTRACT(MONTH FROM p."updatedAt") = 12 THEN 'Diciembre'
    END AS mes 
    FROM 
    pedidos p 
    JOIN 
    solicitudes s ON s."id_Pedido" = p.id 
    JOIN 
    productos pr ON s."id_Producto" = pr.id     
    WHERE 
    p.estado = 'Pagado' 
    AND p."updatedAt" >= DATE_TRUNC('year', CURRENT_DATE) 
    AND p."updatedAt" < DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year'
    ORDER BY 
    EXTRACT(MONTH FROM p."updatedAt");

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