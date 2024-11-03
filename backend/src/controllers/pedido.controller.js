"use strict";
import {
    createPedidoService,
    deletePedidoService,
    getPedidoService,
    getPedidosService,
    updatePedidoService,
} from "../services/pedido.service.js";
import {
    pedidoBodyValidation,
    pedidoQueryValidation,
} from "../validations/pedido.validation.js";//falta hacer las validaciones
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getPedido(req, res) {
    try {
        const { id, mesaID, total, estado } = req.params;

        const { error } = pedidoQueryValidation.validate({ id, mesaID, total, estado });

        if (error) return handleErrorClient(res, 400, error.message);

        const [Pedido, errorPedido] = await getPedidoService({ id, mesaID, total, estado });

        if (errorPedido) return handleErrorClient(res, 404, errorPedido);

        handleSuccess(res, 200, "Pedido encontrado", Pedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getPedidos(req, res) {
    try {
        const [pedidos, errorPedidos] = await getPedidosService();

        if (errorPedidos) return handleErrorClient(res, 404, errorPedidos);

        pedidos.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Pedidos encontrados", pedidos);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updatePedido(req, res) {
    try {
        const { id, mesaID, total, estado } = req.query;
        const { body } = req;

        const { error: queryError } = pedidoQueryValidation.validate({
            id,
            mesaID,
            total,
            estado,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const { error: bodyError } = pedidoBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message,
            );

        const [pedido, pedidoError] = await updatePedidoService({ id, mesaID, total, estado }, body);

        if (pedidoError) return handleErrorClient(res, 400, "Error modificando el pedido", pedidoError);

        handleSuccess(res, 200, "Pedido modificado correctamente", pedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deletePedido(req, res) {
    try {
        const { id, mesaID, total, estado } = req.query;

        const { error: queryError } = pedidoQueryValidation.validate({
            id,
            mesaID,
            total,
            estado,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const [pedidoDelete, errorPedidoDelete] = await deletePedidoService({
            id,
            mesaID,
            total,
            estado,
        });

        if (errorPedidoDelete) return handleErrorClient(res, 404, "Error eliminado el pedido", errorPedidoDelete);

        handleSuccess(res, 200, "Pedido eliminado correctamente", pedidoDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createPedido(req, res) {
    try {
        const { body } = req;

        const { error } = pedidoBodyValidation.validate(body);

        if (error)
            return handleErrorClient(res, 400, "Error de validación", error.message);

        const [newPedido, errorNewpedido] = await createPedidoService(body);

        if (errorNewpedido) return handleErrorClient(res, 400, "Error registrando al usuario", errorNewUser);

        handleSuccess(res, 201, "Usuario registrado con éxito", newPedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}