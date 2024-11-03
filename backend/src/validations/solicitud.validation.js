"use strict";
import Joi from "joi";

export const pedidoQueryValidation = Joi.object({
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
            "number.min":"La cantidad debe ser al menos 1",
        }),
})
    .or("id_Producto,id_Pedido,cantidad")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id del Producto,id del Pedido o cantidad.",
    });

export const pedidoBodyValidation = Joi.object({
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
        "number.min":"La cantidad debe ser al menos 1",
    }),
})
.or("id_Producto,id_Pedido,cantidad")
.unknown(false)
.messages({
    "object.unknown": "No se permiten propiedades adicionales.",
    "object.missing":
        "Debes proporcionar al menos un parámetro: id del Producto,id del Pedido o cantidad.",
});