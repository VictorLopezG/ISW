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
        const { id } = req.params;   

        const [Pedido, errorPedido] = await getPedidoService({ id });

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
        const { id} = req.params;
        const { body } = req;

        const pedidoFound = await getPedidoService({ id });

        if (!pedidoFound) return handleErrorClient(res, 404, "Pedido no encontrado");


        const { error: bodyError } = pedidoBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message,
            );
            

        const [pedido, pedidoError] = await updatePedidoService({ id }, body);

        if (pedidoError) return handleErrorClient(res, 400, "Error modificando el pedido", pedidoError);

        handleSuccess(res, 200, "Pedido modificado correctamente", pedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deletePedido(req, res) {
    try {

    
        const { id} = req.params;
 

        const pedidoFound = await getPedidoService({ id });

        if (!pedidoFound) return handleErrorClient(res, 404, "Pedido no encontrado");


        const [pedidoDelete, errorPedidoDelete] = await deletePedidoService({
            id,});

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

        if (errorNewpedido) return handleErrorClient(res, 400, "Error registrando al usuario", errorNewpedido);

        handleSuccess(res, 201, "Usuario registrado con éxito", newPedido);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

//funcion con consulta sql para la tabla de cocinería viva chile
export async function getPedidosCocina(req, res) {
    try {
        const { body } = req;
        
    } catch (error) {
        handleErrorServer(res, 500, error.message);
        console.log(error)   
    }


}