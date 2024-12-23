"use strict";
import Pedido from "../entity/pedido.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPedidoService(query) {
    try {
        const { id } = query;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const pedidoFound = await pedidoRepository.findOne({
            where: [{ id: id }],
        });

        if (!pedidoFound) return [null, "Pedido no encontrado o no existe"];

        const { ...pedidoData } = pedidoFound;

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

        const pedidosData = pedidos.map(({ ...pedido }) => pedido);

        return [pedidosData, null];
    } catch (error) {
        console.error("Error al obtener a los pedidos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updatePedidoService(query, body) {
    try {

        const { id } = query;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        const datapedidoUpdate = {
            id: id,
            mesaID: body.mesaID,
            total: body.total,
            descripcion: body.descripcion,
            updatedAt: new Date(),
            estado: body.estado,
        };

        await pedidoRepository.update({ id: id }, datapedidoUpdate);

        const pedidoData = await pedidoRepository.findOne({
            where: { id: id },
        });

        if (!pedidoData) {
            return [null, "Pedido no encontrado después de actualizar"];
        }

        const { ...pedidoUpdated } = pedidoData;

        return [pedidoUpdated, null];
    } catch (error) {
        console.error("Error al modificar el pedido:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deletePedidoService(query) {

    try {
        //console.log("entro a service")
        //console.log(query)

        const { id } = query;
        //console.log(id)

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        //console.log("antes de error")

        const pedidoFound = await pedidoRepository.findOne({
            where: [{ id: id }],
        });

        if (!pedidoFound) return [null, "Pedido no encontrado"];

        if (pedidoFound.estado === "pagado") {
            return [null, "No se puede eliminar un pedido una vez pagado"];
        }
        

        const pedidoDeleted = await pedidoRepository.remove(pedidoFound);

        //console.log("despues de error")

        const { ...dataPedido } = pedidoDeleted;

        return [dataPedido, null];
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createPedidoService(pedido) {
    try {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        const estado = "pendiente";
        const { mesaID, total, descripcion } = pedido;
        const newPedido = pedidoRepository.create({
            mesaID, total, descripcion, estado
        });
        //console.log(newPedido);

        await pedidoRepository.save(newPedido);

        const { ...dataPedido } = newPedido;

        return [dataPedido, null];
    } catch (error) {
        console.error("Error al crear el pedido", error);
        return [null, "Error interno del servidor"];
    }
}
