"use strict";
import Solicitud from "../entity/solicitud.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getSolicitudService(query) {
    try {

        const { id_Pedido,id_Producto } = query;
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: { id_Pedido:id_Pedido, id_Producto:id_Producto },
        });
        console.log("solicitudFound", solicitudFound);


        if (!solicitudFound) return [null, "Solicitud no encontrada o no existe"];
        
        return [solicitudFound, null];


    } catch (error) {
        console.error("Error obtener la solicitud:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getSolicitudesByPedidoService(query) {
    try {
        const { id_Pedido} = query;
        const solicitudRepository = AppDataSource.getRepository(Solicitud);
        const solicitudes = await solicitudRepository.find({
            where: {id_Pedido:id_Pedido} 
        });
        console.log("solicitudFound", solicitudes);

        if (!solicitudes || solicitudes.length === 0) return [null, "No hay solicitudes"];

        const solicitudesData = solicitudes.map(({...solicitud }) => solicitud);

        return [solicitudesData, null];

    } catch (error) {
        console.error("Error obtener las solicitudes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getSolicitudesService() {
    try {
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudes = await solicitudRepository.find();

        if (!solicitudes || solicitudes.length === 0) return [null, "No hay solicitudes"];

        const solicitudesData = solicitudes.map(({ ...solicitud }) => solicitud);

        return [solicitudesData, null];
    } catch (error) {
        console.error("Error al obtener a los solicitudes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateSolicitudService(query, body) {
    try {
        const { id_Pedido, id_Producto, cantidad, estado } = query;
        
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: [{ id_Pedido: id_Pedido }, { id_Producto: id_Producto }, { cantidad: cantidad }, { estado: estado }],
        });

        if (!solicitudFound) return [null, "Solicitud no encontrada"];

        const datasolicitudUpdate = {
            estado: body.estado,
            cantidad: body.cantidad,
        };

        await solicitudRepository.update({ id_Pedido: id_Pedido, id_Producto: id_Producto }, datasolicitudUpdate);

        const solicitudData = await solicitudRepository.findOne({
            where: { id_Pedido: id_Pedido, id_Producto: id_Producto, cantidad: body.cantidad, estado: body.estado },
        });

        if (!solicitudData) {
            return [null, "Solicitud no encontrado después de actualizar"];
        }

        const { ...solicitudUpdated } = solicitudData;

        return [solicitudUpdated, null];
    } catch (error) {
        console.error("Error al modificar el solicitud:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteSolicitudService(query) {
    try {
        console.log("query", query);
        const { id_Pedido, id_Producto } = query;



        const solicitudRepository = AppDataSource.getRepository(Solicitud);
        console.log("solicitudRepository", solicitudRepository);


        const solicitudFound = await solicitudRepository.findOne({
            where: [{ id_Pedido: id_Pedido } && { id_Producto: id_Producto }],
        });


        console.log("solicitudFound", solicitudFound);
        

        if (!solicitudFound) return [null, "Solicitud no encontrada"];

        const solicitudDeleted = await solicitudRepository.remove(solicitudFound);
        console.log("solicitudDeleted", solicitudDeleted);

        return [solicitudDeleted, null];
    } catch (error) {
        console.error("Error al eliminar la solicitud:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createSolicitudService(solicitud) {
    try {
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const { id_Pedido, id_Producto, cantidad, estado } = solicitud;

        const newSolicitud = solicitudRepository.create({
            id_Pedido: id_Pedido, id_Producto: id_Producto, cantidad: cantidad, estado: estado
        });

        await solicitudRepository.save(newSolicitud);

        const { ...dataSolicitud } = newSolicitud;

        return [dataSolicitud, null];
    } catch (error) {
        console.error("Error al crear la solicitud", error);
        return [null, "Error interno del servidor"];
    }
}
