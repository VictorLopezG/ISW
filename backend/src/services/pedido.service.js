"use strict";
import Pedido from "../entity/pedido.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPedidoService(query) {
    try {
        const { mesaID, id, estado, total } = query;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const pedidoFound = await pedidoRepository.findOne({
            where: [{ id: id }, { mesaID: mesaID }, { total: total }, { estado: estado }],
        });

        if (!pedidoFound) return [null, "Pedido no encontrado o no existe"];

        const { pedidoData } = pedidoFound;

        return [pedidoData, null];
    } catch (error) {
        console.error("Error obtener el pedidp:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getPedidosService() {
    try {
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const pedidos = await pedidoRepository.find();

        if (!pedidos || pedidos.length === 0) return [null, "No hay pedidos"];

        const pedidosData = pedidos.map(({  pedido }) => pedido);

        return [pedidosData, null];
    } catch (error) {
        console.error("Error al obtener a los pedidos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updatePedidoService(query, body) {
    try {
        const { mesaID, id, estado, total } = query;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const pedidoFound = await pedidoRepository.findOne({
            where: [{ id: id }, { mesaID: mesaID }, { total: total }, { estado: estado }],
        });

        if (!pedidoFound) return [null, "Pedido no encontrado"];

        const existingPedido = await pedidoRepository.findOne({
            where: [{ id: id }, { mesaID: mesaID }, { total: total }, { estado: estado }],
        });

        if (existingPedido && existingPedido.id !== pedidoFound.id) {
            return [null, "No se puede cambiar la id de un pedido"];
        }

        const datapedidoUpdate = {
            mesaID: body.mesaID,
            total: body.total,
            descripcion: body.descripcion,
            estado: body.estado,
            updatedAt: new Date(),
        };

        await pedidoRepository.update({ id: pedidoFound.id }, datapedidoUpdate);

        const pedidoData = await pedidoRepository.findOne({
            where: { id: pedidoFound.id },
        });

        if (!pedidoData) {
            return [null, "Pedido no encontrado después de actualizar"];
        }

        const { pedidoUpdated } = pedidoData;

        return [pedidoUpdated, null];
    } catch (error) {
        console.error("Error al modificar el pedido:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deletePedidoService(query) {
    try {
        const { id, mesaID, total } = query;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const pedidoFound = await pedidoRepository.findOne({
            where: [{ id: id }, { mesaID: mesaID }, { total: total }],
        });

        if (!pedidoFound) return [null, "Pedido no encontrado"];

        if (pedidoFound.estado === "pagado") {
            return [null, "No se puede eliminar un pedido una vez pagado"];
        }

        const pedidoDeleted = await pedidoRepository.remove(pedidoFound);

        const { dataPedido } = pedidoDeleted;

        return [dataPedido, null];
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        return [null, "Error interno del servidor"];
    }
}