"use strict";
import {
    deleteSolicitudService,
    getSolicitudsService,
    updateSolicitudService,
    createSolicitudService,
} from "../services/solicitud.service.js";
import {
    solicitudBodyValidation,
    solicitudQueryValidation,
} from "../validations/solicitud.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";
import Solicitud from "../entity/solicitud.entity.js"; 
import { AppDataSource } from "../config/configDb.js"; 


export async function getSolicitud(req, res) {
    try {
        const { id } = req.params; 
        console.log("ID recibido:", id);

 
        const solicitudRepository = AppDataSource.getRepository(Solicitud);

        const solicitudFound = await solicitudRepository.findOne({
            where: { id: id },
        });

        console.log("Solicitud encontrada:", solicitudFound);


        if (!solicitudFound) {
            return handleErrorClient(res, 404, "Solicitud no encontrada o no existe");
        }


        handleSuccess(res, 200, "Solicitud encontrada", solicitudFound);
    } catch (error) {

        console.error("Error al obtener la solicitud:", error);
        handleErrorServer(res, 500, "Error interno del servidor");
    }
}



export async function getSolicitudes(req, res) {
    try {
        const [solicitudes, errorSolicitudes] = await getSolicitudsService();

        if (errorSolicitudes) return handleErrorClient(res, 404, errorSolicitudes);

        solicitudes.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Usuarios encontrados", solicitudes);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateSolicitud(req, res) {
    try {
        const { id_Pedido, id_Producto,cantidad, estado } = req.query;
        const { body } = req;

        const { error: queryError } = solicitudQueryValidation.validate({
            id_Pedido, id_Producto, cantidad, estado
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const { error: bodyError } = solicitudBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message,
            );

        const [solicitud, solicitudError] = await updateSolicitudService({ id_Pedido, id_Producto, cantidad, estado }, body);

        if (solicitudError) return handleErrorClient(res, 400, "Error modificando la solicitud", solicitudError);

        handleSuccess(res, 200, "Solicitud modificada correctamente", solicitud);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteSolicitud(req, res) {
    try {
        const { id_Pedido, id_Producto} = req.query;

        const { error: queryError } = solicitudQueryValidation.validate({
            id_Pedido, id_Producto
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        const [solicitudDelete, errorSolicitudDelete] = await deleteSolicitudService({
            id_Pedido, id_Producto
        });

        if (errorSolicitudDelete) return handleErrorClient(res, 404, "Error eliminado la solicitud", errorSolicitudDelete);

        handleSuccess(res, 200, "Solicitud eliminada correctamente", solicitudDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createSolicitud(req, res) {
    try {
        const { body } = req;

        const { error } = solicitudBodyValidation.validate(body);

        if (error)
            return handleErrorClient(res, 400, "Error de validación", error.message);

        const [newSolicitud, errorNewSolicitud] = await createSolicitudService(body);

        if (errorNewSolicitud) return handleErrorClient(res, 400, "Error al crear la solicitud", errorNewSolicitud);

        handleSuccess(res, 201, "Solicitud creada con éxito", newSolicitud);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}