"use strict";
import Joi from "joi";

export const productoQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id del producto debe ser un número.",
            "number.integer": "El id del producto debe ser un número entero.",
            "number.positive": "El id del producto debe ser un número positivo.",
        }),
    /* nombre: Joi.string()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/) 
    .messages({
        "string.empty": "El nombre no puede estar vacío.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener como mínimo 1 caracterer.",
        "string.max": "El nombre debe tener como máximo 50 caracteres.",
        "string.pattern.base": "El nombre solo puede contener letras y espacios.",
    }),
    */
})
    .or("id",
        "nombre")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id del Producto o nombre del producto.",
    });

export const productoBodyValidation = Joi.object({
    nombre: Joi.string()
        .min(1)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.min": "El nombre debe tener como mínimo 1 caracterer.",
            "string.max": "El nombre debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El nombre solo puede contener letras y espacios.",
        }),
    valor: Joi.number()
        .positive()
        .integer()
        .messages({
            "number.base": "El valor del producto debe ser un número.",
            "number.integer": "El valor del producto debe ser un número entero.",
            "number.positive": "El valor del producto debe ser un número positivo.",
        }),
    stock: Joi.number()
        .integer()
        .min(0)
        .messages({
            "number.base": "El stock del producto debe ser un número.",
            "number.integer": "El stock del producto debe ser un número entero.",
            "number.min": "El stock del producto debe ser un número positivo.",
        }),
    categoria: Joi.string()
        .min(4)
        .max(15)
        .messages({
            "string.base": "La categoria debe ser de tipo string.",
            "string.min": "La categoria debe tener como mínimo 4 caracteres.",
            "string.max": "La categoria tener como máximo 15 caracteres.",
        }),
})
    .or("nombre",
        "valor",
        "stock",
        "categoria")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: nombre, valor o stock de este.",
    });