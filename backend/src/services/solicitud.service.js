"use strict";
import Solicitud from "../entity/solicitud.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getSolicitudService(query) {
    try {

        const { id } = query;
        console.log("id", id);
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: { id: id },
        });
        console.log("solicitudFound", solicitudFound);


        if (!solicitudFound) return [null, "Solicitud no encontrada o no existe"];
        
        return [solicitudFound, null];

    } catch (error) {
        console.error("Error obtener la solicitud:", error);
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
            id_Pedido: body.id_Pedido,
            id_Producto: body.id_Producto,
            estado: body.estado,
            cantidad: body.cantidad,
        };

        await solicitudRepository.update({ id_Pedido: solicitudFound.id_Pedido, id_Producto: solicitudFound.id_Producto }, datasolicitudUpdate);

        const solicitudData = await solicitudRepository.findOne({
            where: { id_Pedido: body.id_Pedido, id_Producto: body.id_Producto, cantidad: body.cantidad, estado: body.estado },
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
        const { id_Pedido, id_Producto } = query;

        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: [{ id_Pedido: id_Pedido }, { id_Producto: id_Producto }],
        });

        if (!solicitudFound) return [null, "Solicitud no encontrada"];

        const solicitudDeleted = await solicitudRepository.remove(solicitudFound);

        const { dataSolicitud } = solicitudDeleted;

        return [...dataSolicitud, null];
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
