"use strict";
import Solicitud from "../entity/solicitud.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getSolicitudService(query) {
    try {
        const { id_Pedido, id_Producto, cantidad } = query;

        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: [{ id_Pedido: id_Pedido }, { id_Producto: id_Producto }, { cantidad: cantidad }],
        });

        if (!solicitudFound) return [null, "Solicitud no encontrada o no existe"];

        const { solicitudData } = solicitudFound;

        return [solicitudData, null];
    } catch (error) {
        console.error("Error obtener el pedidp:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getSolicitudsService() {
    try {
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudes = await solicitudRepository.find();

        if (!solicitudes || solicitudes.length === 0) return [null, "No hay solicitudes"];

        const solicitudesData = solicitudes.map(({ solicitud }) => solicitud);

        return [solicitudesData, null];
    } catch (error) {
        console.error("Error al obtener a los solicitudes:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateSolicitudService(query, body) {
    try {
        const { id_Pedido, id_Producto, cantidad } = query;

        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: [{ id_Pedido: id_Pedido }, { id_Producto: id_Producto }, { cantidad: cantidad }],
        });

        if (!solicitudFound) return [null, "Solicitud no encontrada"];

        const datasolicitudUpdate = {
            mesaID: body.mesaID,
            total: body.total,
            descripcion: body.descripcion,
            estado: body.estado,
            updatedAt: new Date(),
        };

        await solicitudRepository.update({ id_Pedido:solicitudFound.id_Pedido,id_Producto:solicitudFound.id_Producto }, datasolicitudUpdate);

        const solicitudData = await solicitudRepository.findOne({
            where: { id_Pedido:solicitudFound.id_Pedido,id_Producto:solicitudFound.id_Producto },
        });

        if (!solicitudData) {
            return [null, "Solicitud no encontrado después de actualizar"];
        }

        const { solicitudUpdated } = solicitudData;

        return [solicitudUpdated, null];
    } catch (error) {
        console.error("Error al modificar el solicitud:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteSolicitudService(query) {
    try {
        const { id_Pedido, id_Producto, cantidad } = query;

        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: [{ id_Pedido: id_Pedido }, { id_Producto: id_Producto }, { cantidad: cantidad }],
        });

        if (!solicitudFound) return [null, "Solicitud no encontrada"];

        const solicitudDeleted = await solicitudRepository.remove(solicitudFound);

        const { dataSolicitud } = solicitudDeleted;

        return [dataSolicitud, null];
    } catch (error) {
        console.error("Error al eliminar la solicitud:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createSolicitudService(solicitud) {
    try {
      const solicitudRepository = AppDataSource.getRepository(Solicitud);
  
      const { id_Pedido, id_Producto, cantidad } = solicitud;
  
      const createErrorMessage = (dataInfo, message) => ({
        dataInfo,
        message
      });
  
      const newSolicitud = solicitudRepository.create({
        id_Pedido, id_Producto, cantidad
      });
  
      await solicitudRepository.save(newSolicitud);
  
      const { dataSolicitud } = newSolicitud;
  
      return [dataSolicitud, null];
    } catch (error) {
      console.error("Error al crear la solicitud", error);
      return [null, "Error interno del servidor"];
    }
  }
  