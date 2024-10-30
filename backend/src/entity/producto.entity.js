"use strict";
import { EntitySchema } from "typeorm";

const Producto = new EntitySchema({
    name: "Producto",
    tableName: "productos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombre: {
            type: "varchar",
            length: 31,
            nullable: false
        },
        descripcion: {
            type: "varchar",
            length: 255,
            nullable: true
        },
        valor: {
            type: "int",
            nullable: false
        },
        stock: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_PROD",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_NombreProd",
            columns: ["numeroMesa"],
            unique: true,
        },
        {
            name: "IDX_updatedAt",
            columns: ["capacidad"],
        },
    ],
});

export default ProductoSchema;
