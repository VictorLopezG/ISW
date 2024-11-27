"use strict";
import Joi from "joi";

export const solicitudQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id de la solicitud debe ser un número.",
            "number.integer": "El id de la solicitud debe ser un número entero.",
            "number.positive": "El id de la solicitud debe ser un número positivo.",
        }),
    id_Producto: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id del producto debe ser un número.",
            "number.integer": "El id del producto debe ser un número entero.",
            "number.positive": "El id del producto debe ser un número positivo.",
        }),
    id_Pedido: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El id de pedido debe ser un número.",
            "number.integer": "El id de pedido debe ser un número entero.",
            "number.positive": "El id de pedido debe ser un número positivo.",
        })
})
    .or("id, id_Producto", "id_Pedido")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id del Producto e id del Pedido.",
    });

export const solicitudBodyValidation = Joi.object({

    id_Producto: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id del producto debe ser un número.",
            "number.integer": "El id del producto debe ser un número entero.",
            "number.positive": "El id del producto debe ser un número positivo.",
        }),
    id_Pedido: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El id de pedido debe ser un número.",
            "number.integer": "El id de pedido debe ser un número entero.",
            "number.positive": "El id de pedido debe ser un número positivo.",
        }),
    cantidad: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
            "number.base": "La cantidad.",
            "number.integer": "La cantidad debe ser un número entero.",
            "number.positive": "La cantidad ser un número positivo.",
            "number.min": "La cantidad debe ser al menos 1",
        }),
    estado: Joi.string()
        .min(4)
        .max(15)
        .messages({
            "string.base": "El estado debe ser de tipo string.",
            "string.min": "El estado debe tener como mínimo 4 caracteres.",
            "string.max": "El estado debe tener como máximo 15 caracteres.",
        }),
})
    .or("id_Producto", "id_Pedido", "cantidad", "estado")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id del Producto,id del Pedido o cantidad.",
    });