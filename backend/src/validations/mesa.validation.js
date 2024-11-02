"use strict";
import Joi from "joi";

export const mesaQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    capacidad: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    descripcion:Joi.string()
    .min(1)
    .max(50)
    .messages({
        "string.empty": "La descripcion no puede estar vacía.",
        "string.base": "La descripcion debe ser de tipo string.",
        "string.min": "La descripcion debe tener como mínimo 1 caracterer.",
        "string.max": "La descripcion debe tener como máximo 50 caracteres.",
    })

})
    .or("id,capacidad,descripcion")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id, capacidad o descripcion.",
    });

export const mesaBodyValidation = Joi.object({
    descripcion: Joi.string()
        .min(1)
        .max(50)
        .messages({
            "string.empty": "La descripcion no puede estar vacía.",
            "string.base": "La descripcion debe ser de tipo string.",
            "string.min": "La descripcion debe tener como mínimo 1 caracterer.",
            "string.max": "La descripcion debe tener como máximo 50 caracteres.",
        }),
    capacidad: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
            "number.base": "La capacidad debe ser de tipo integer.",
            "number.positive": "La capacidad debe ser minimo 1.",
            "number.min":"La capacidad debe ser por lo menos 1"
        }),
})
    .or(
        "descripcion",
        "capacidad",
    )
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un campo: capacidad o descripcion.",
    });
