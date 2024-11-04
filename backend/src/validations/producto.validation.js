"use strict";
import Joi from "joi";

export const productoQueryValidation = Joi.object({
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
})
    .or("id_Producto,id_Pedido,cantidad")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id del Producto,id del Pedido o cantidad.",
    });

export const productoBodyValidation = Joi.object({
    stock: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id del producto debe ser un número.",
            "number.integer": "El id del producto debe ser un número entero.",
            "number.positive": "El id del producto debe ser un número positivo.",
        }),
    valor: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El valor del producto debe ser un número.",
            "number.integer": "El valor del producto debe ser un número entero.",
            "number.positive": "El valor del producto debe ser un número positivo.",
        }),
    nombre: Joi.string()
        .min(1)
        .max(50)
        .messages({
            "string.empty": "La descripcion no puede estar vacía.",
            "string.base": "La descripcion debe ser de tipo string.",
            "string.min": "La descripcion debe tener como mínimo 1 caracterer.",
            "string.max": "La descripcion debe tener como máximo 50 caracteres.",
        }),
})
    .or("stock,valor,nombre")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: stock, valor o cantidad.",
    });