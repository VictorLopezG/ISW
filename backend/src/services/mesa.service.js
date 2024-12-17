"use strict";
import Mesa from "../entity/mesa.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getMesaService(query) {
    try {

        const { id } = query;


        const mesaRepository = AppDataSource.getRepository(Mesa);


        const mesaFound = await mesaRepository.findOne({
            where: [{ id: id }],
        });

        if (!mesaFound) return [null, "Mesa no encontrada o no existe"];

        const { ...mesaData } = mesaFound;

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

        const mesasData = mesas.map(({ ...mesa }) => mesa);

        return [mesasData, null];

    } catch (error) {
        console.error("Error al obtener a las mesas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateMesaService(query, body) {
    try {
        const { id } = query;

        const mesaRepository = AppDataSource.getRepository(Mesa);

        const createErrorMessage = (DataInfo, message) => ({
            DataInfo,
            message
        })

        const MesaFound = await mesaRepository.findOne({
            where: [{ id: id }],
        });

        if (!MesaFound)
            return [null,
            createErrorMessage("Mesa no encontrada", "La mesa no ha sido encontrada")];

        const existingMesa = await mesaRepository.findOne({
            where: [{ descripcion: body.descripcion }],
        });

        if(existingMesa && existingMesa.id !== MesaFound.id){
            return[null,
                createErrorMessage("Descripcion","Descripcion ya en uso")]
        }

        if(body.capacidad < 0 || body.capacidad > 15)
            return [null,createErrorMessage("Capacidad","La capacidad debe de estar 0 y 15")];

        const dataMesaUpdate = {
            capacidad: body.capacidad,
            descripcion: body.descripcion,
        };

        await mesaRepository.update({ id: id }, dataMesaUpdate);

        const mesaData = await mesaRepository.findOne({
            where: { id: id },
        });

        if (!mesaData) {
            return [null, "Mesa no encontrada después de actualizar"];
        }

        const { ...mesaUpdated } = mesaData;

        return [mesaUpdated, null];
    } catch (error) {
        console.error("Error al modificar la mesa:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteMesaService(query) {
    try {
        console.log("holaa");
        const { id, descripcion, capacidad } = query;

        const mesaRepository = AppDataSource.getRepository(Mesa);

        const mesaFound = await mesaRepository.findOne({
            where: [{ id: id }, { descripcion: descripcion }, { capacidad: capacidad }],
        });

        if (!mesaFound) return [null, "mesa no encontrado"];

        const mesaDeleted = await mesaRepository.remove(mesaFound);

        const { ...dataMesa } = mesaDeleted;

        return [dataMesa, null];

    } catch (error) {
        console.error("Error al eliminar el mesa:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createMesaService(mesa) {
    try {
        const mesaRepository = AppDataSource.getRepository(Mesa);

        const { descripcion, capacidad } = mesa;

        const createErrorMessage = (dataInfo, message) => ({
            dataInfo,
            message
        });

        const existingMesa = await mesaRepository.findOne({
            where:{
                descripcion,
            },
        });

        if (existingMesa)
            return [null,createErrorMessage("Descripcion","Descripcion ya en uso")];

        if(capacidad < 0 || capacidad > 15)
            return [null,createErrorMessage("Capacidad","La capacidad debe de estar 0 y 15")];

        const newMesa = mesaRepository.create({
            descripcion: descripcion, 
            capacidad: capacidad,
        });

        await mesaRepository.save(newMesa);

        const { ...dataMesa } = newMesa;

        return [dataMesa, null];
    } catch (error) {
        console.error("Error al crear la mesa ", error);
        return [null, "Error interno del servidor"];
    }
}
