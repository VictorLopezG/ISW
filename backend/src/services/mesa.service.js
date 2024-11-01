"use strict";
import Mesa from "../entity/mesa.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getMesaService(query) {
    try {
        const { id, descripcion,capacidad } = query;

        const mesaRepository = AppDataSource.getRepository(Mesa);

        const mesaFound = await mesaRepository.findOne({
            where: [{ id: id }, { descripcion:descripcion }, { capacidad:capacidad }],
        });

        if (!mesaFound) return [null, "Mesa no encontrada o no existe"];

        const { mesaData } = mesaFound;

        return [mesaData, null];
    } catch (error) {
        console.error("Error obtener el pedidp:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getMesasService() {
    try {
        const mesaRepository = AppDataSource.getRepository(Mesa);

        const mesas = await mesaRepository.find();

        if (!mesas || mesas.length === 0) return [null, "No hay mesas"];

        const mesasData = mesas.map(({  mesa }) => mesa);

        return [mesasData, null];
    } catch (error) {
        console.error("Error al obtener a las mesas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateMesaService(query, body) {
    try {
        const { id, descripcion,capacidad } = query;

        const mesaRepository = AppDataSource.getRepository(Mesa);

        const mesaFound = await mesaRepository.findOne({
            where: [{ id: id }, { descripcion:descripcion }, { capacidad:capacidad }],
        });

        if (!mesaFound) return [null, "mesa no encontrado"];

        const existingMesa = await mesaRepository.findOne({
            where: [{ id: id }, { descripcion:descripcion }, { capacidad:capacidad }],
        });

        if (existingMesa && existingMesa.id !== mesaFound.id) {
            return [null, "No se puede cambiar la id de un mesa"];
        }

        const dataMesaUpdate = {
            id:body.id,
            capacidad: body.capacidad,
            descripcion:body.descripcion,
            updatedAt: new Date(),
        };

        await mesaRepository.update({ id: mesaFound.id }, dataMesaUpdate);

        const mesaData = await mesaRepository.findOne({
            where: { id: mesaFound.id },
        });

        if (!mesaData) {
            return [null, "Mesa no encontrada después de actualizar"];
        }

        const { mesaUpdated } = mesaData;

        return [mesaUpdated, null];
    } catch (error) {
        console.error("Error al modificar la mesa:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteMesaService(query) {
    try {
        const { id, descripcion,capacidad } = query;

        const mesaRepository = AppDataSource.getRepository(Mesa);

        const mesaFound = await mesaRepository.findOne({
            where: [{ id: id }, { descripcion:descripcion }, { capacidad:capacidad }],
        });

        if (!mesaFound) return [null, "mesa no encontrado"];

        const mesaDeleted = await mesaRepository.remove(mesaFound);

        const { dataMesa } = mesaDeleted;

        return [dataMesa, null];
    } catch (error) {
        console.error("Error al eliminar el mesa:", error);
        return [null, "Error interno del servidor"];
    }
}