"use strict";
import Joi from "joi";

export const pedidoQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    mesaID: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),

    total: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El total debe ser un número.",
            "number.integer": "El total debe ser un número entero.",
            "number.positive": "El total debe ser un número positivo.",
        }),

})
    .or("id,capacidad,descripcion")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id, capacidad o descripcion.",
    });

export const pedidoBodyValidation = Joi.object({
    descripcion: Joi.string()
        .min(1)
        .max(50)
        .messages({
            "string.empty": "La descripcion no puede estar vacía.",
            "string.base": "La descripcion debe ser de tipo string.",
            "string.min": "La descripcion debe tener como mínimo 1 caracterer.",
            "string.max": "La descripcion debe tener como máximo 50 caracteres.",
        }),
    total: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El total debe ser de tipo integer.",
            "number.positive": "El total debe ser minimo 1.",
        }),
    estado: Joi.string()
        .min(1)
        .max(50)
        .messages({
            "string.empty": "El estado no puede estar vacío.",
            "string.base": "El estado debe ser de tipo string.",
            "string.min": "El estado debe tener como mínimo 1 caracterer.",
            "string.max": "El estado debe tener como máximo 50 caracteres.",
        }),
    mesaID: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
})
    .or(
        "total",
        "mesaID",
    )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un campo: total o estado.",
    });
