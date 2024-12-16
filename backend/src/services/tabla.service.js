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

export const getVentasTotalService = async () => {
    const query = `
    SELECT 
        COUNT(*) AS total_pedidos,
        SUM(total) AS total_recaudado
    FROM 
        pedidos
    WHERE 
        DATE_TRUNC('month', pedidos."createdAt") = DATE_TRUNC('month', CURRENT_DATE);
    `;

    try {
        console.log("Iniciando consulta de ventas...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);

        console.log("Consulta exitosa:", result);
        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}

export const getVentasAnualService = async (añoespecifico) => {
    const query = `
SELECT
    CASE TO_CHAR(DATE_TRUNC('month', "createdAt"), 'FMMonth')
        WHEN 'January' THEN 'Enero'
        WHEN 'February' THEN 'Febrero'
        WHEN 'March' THEN 'Marzo'
        WHEN 'April' THEN 'Abril'
        WHEN 'May' THEN 'Mayo'
        WHEN 'June' THEN 'Junio'
        WHEN 'July' THEN 'Julio'
        WHEN 'August' THEN 'Agosto'
        WHEN 'September' THEN 'Septiembre'
        WHEN 'October' THEN 'Octubre'
        WHEN 'November' THEN 'Noviembre'
        WHEN 'December' THEN 'Diciembre'
    END AS mes,
    SUM(total) AS total_recaudado
FROM
    pedidos
WHERE
    EXTRACT(YEAR FROM "createdAt") = ${añoespecifico}
GROUP BY
    DATE_TRUNC('month', "createdAt")
ORDER BY
    DATE_TRUNC('month', "createdAt");

    `;
    try {
        console.log("Iniciando consulta de ventas...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);

        console.log("Consulta exitosa:", result);
        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}

export const getVentasProductosService = async () => {
    const query = `
    SELECT 
        p.nombre AS producto,
        SUM(s.cantidad) AS total_vendido
    FROM 
        productos p
    JOIN 
        solicitudes s ON p.id = s."id_Producto" 
    GROUP BY 
        p.nombre
    ORDER BY 
        total_vendido DESC;
    `;
    try {
        console.log("Iniciando consulta de ventas...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);

        console.log("Consulta exitosa:", result);
        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}

export const getPeriodoService = async () => {
    const query = `
        SELECT 
      CASE 
        WHEN EXTRACT(HOUR FROM s."createdAt") < 9 THEN 'Antes de 09:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 9 AND 10 THEN '09:00 - 11:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 11 AND 12 THEN '11:00 - 13:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 13 AND 14 THEN '13:00 - 15:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 15 AND 16 THEN '15:00 - 17:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 17 AND 18 THEN '17:00 - 19:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 19 AND 20 THEN '19:00 - 21:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 21 AND 22 THEN '21:00 - 23:00'
        ELSE 'Después de 23:00'
      END AS horario,
      COUNT(*) AS cantidad
    FROM solicitudes s 
    GROUP BY 
      CASE 
        WHEN EXTRACT(HOUR FROM s."createdAt") < 9 THEN 'Antes de 09:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 9 AND 10 THEN '09:00 - 11:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 11 AND 12 THEN '11:00 - 13:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 13 AND 14 THEN '13:00 - 15:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 15 AND 16 THEN '15:00 - 17:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 17 AND 18 THEN '17:00 - 19:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 19 AND 20 THEN '19:00 - 21:00'
        WHEN EXTRACT(HOUR FROM s."createdAt") BETWEEN 21 AND 22 THEN '21:00 - 23:00'
        ELSE 'Después de 23:00'
      END
    ORDER BY cantidad DESC
    `;
    try {
        console.log("Iniciando consulta de ventas...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);

        console.log("Consulta exitosa:", result);
        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}

export const getDiasRankingService = async () => {
    const query = `
    SELECT
    CASE TO_CHAR("createdAt" ::timestamp, 'FMDay')
        WHEN 'Monday' THEN 'Lunes'
        WHEN 'Tuesday' THEN 'Martes'
        WHEN 'Wednesday' THEN 'Miércoles'
        WHEN 'Thursday' THEN 'Jueves'
        WHEN 'Friday' THEN 'Viernes'
        WHEN 'Saturday' THEN 'Sábado'
        WHEN 'Sunday' THEN 'Domingo'
    END AS dia_semana,
    COUNT(*) AS total_solicitudes
FROM
    solicitudes
GROUP BY
    TO_CHAR("createdAt" ::timestamp, 'FMDay')
ORDER BY
    total_solicitudes DESC;
    `;
    try {
        console.log("Iniciando consulta de ventas...");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const result = await AppDataSource.query(query);

        console.log("Consulta exitosa:", result);
        return result;
    } catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        throw new Error("Error al obtener los datos.");
    }
}