"use strict";
import { EntitySchema } from "typeorm";

const ProductoSchema = new EntitySchema({
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
        valor: {
            type: "int",
            nullable: false
        },
        stock: {
            type: "int",
            nullable: false,
        },
        categoria:{
            type: "varchar",
            nullable:false
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
            columns: ["nombre"],
            unique: true,
        },
        {
            name: "IDX_updatedAt",
            columns: ["updatedAt"],
        },
    ],
});

export default ProductoSchema;