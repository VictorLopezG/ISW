"use strict";
import { EntitySchema } from "typeorm";

const MesaSchema = new EntitySchema({
    name: "Mesa",
    tableName: "mesas",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        descripcion: {
            type: "varchar",
            length: 255,
            nullable: true,
        },
        capacidad: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_MESA",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_NumeraMesa",
            columns: ["descripcion"],
            unique: true,
        },
        {
            name: "IDX_capacidad_Mesa",
            columns: ["capacidad"],
        },
    ],
});

export default MesaSchema;
