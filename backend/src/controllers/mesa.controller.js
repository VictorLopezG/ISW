"use strict";
import {
  deleteMesaService,
  getMesaService,
  getMesasService,
  updateMesaService,
  createMesaService
} from "../services/mesa.service.js";
import {
  mesaBodyValidation,
  mesaQueryValidation,
} from "../validations/mesa.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getMesa(req, res) {
  try {
    const { id, descripcion,capacidad} = req.query;

    const { error } = mesaQueryValidation.validate({ id, descripcion,capacidad });

    if (error) return handleErrorClient(res, 400, error.message);

    const [Mesa, errorMesa] = await getMesaService({ id, descripcion,capacidad });

    if (errorMesa) return handleErrorClient(res, 404, errorMesa);

    handleSuccess(res, 200, "Mesa encontrada", Mesa);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getMesas(req, res) {
  try {
    const [mesas, errorMesas] = await getMesasService();

    if (errorMesas) return handleErrorClient(res, 404, errorMesas);

    mesas.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Usuarios encontrados", mesas);
  } catch (error) {
    handleErrorServer(
      res,
      500,
      error.message,
    );
  }
}

export async function updateMesa(req, res) {
  try {
    const {id, descripcion,capacidad } = req.query;
    const { body } = req;

    const { error: queryError } = mesaQueryValidation.validate({
        id,
        descripcion,
        capacidad,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = mesaBodyValidation.validate(body);

    if (bodyError)
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );

    const [mesa, mesaError] = await updateMesaService({ id, descripcion,capacidad }, body);

    if (mesaError) return handleErrorClient(res, 400, "Error modificando la mesa", mesaError);

    handleSuccess(res, 200, "Mesa modificada correctamente", mesa);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteMesa(req, res) {
  try {
    const { id, descripcion,capacidad } = req.query;

    const { error: queryError } = mesaQueryValidation.validate({
        id,
         descripcion,
         capacidad,
    });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const [mesaDelete, errorMesaDelete] = await deleteMesaService({
        id,
        descripcion,
        capacidad,
    });

    if (errorMesaDelete) return handleErrorClient(res, 404, "Error eliminado la mesa", errorMesaDelete);

    handleSuccess(res, 200, "Mesa eliminada correctamente", mesaDelete);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createMesa(req, res) {
  try {
      const { body } = req;

      const { error } = mesaBodyValidation.validate(body);

      if (error)
          return handleErrorClient(res, 400, "Error de validación", error.message);

      const [newMesa, errorNewMesa] = await createMesaService(body);

      if (errorNewMesa) return handleErrorClient(res, 400, "Error al crear la mesa", errorNewMesa);

      handleSuccess(res, 201, "Mesa creada con éxito", newMesa);
  } catch (error) {
      handleErrorServer(res, 500, error.message);
  }
}