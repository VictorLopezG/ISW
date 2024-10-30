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
        numeroMesa: {
            type: "varchar",
            length: 255,
            nullable: false,
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
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
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
            columns: ["numeroMesa"],
            unique: true,
        },
        {
            name: "IDX_capacidad_Mesa",
            columns: ["capacidad"],
        },
    ],
});

export default MesaSchema;
