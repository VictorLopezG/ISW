"use strict";
import { EntitySchema } from "typeorm";

const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "pedidos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        fecha: {
            type: "timestamp with time zone",
            nullable: false,
        },
        total: {
            type: "numeric",
            nullable: false,
        },
        estado: {
            type: "varchar",
            length: 50,
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
        // Relacion mesa-pedido
        mesaID: {
            type: "int",
            nullable: false,
        },
    },
    relations : {
        mesaID: {
            target: "mesas",
            type: "many-to-one",
            onDelete: "CASCADE",
            joinColumn: { name: "mesaID", referencedColumnName: "id" },
        }
    },
    indices: [
        {
            name: "IDX_PEDIDO",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_FECHA",
            columns: ["fecha"],
        },
        {
            name: "IDX_TOTAL",
            columns: ["total"],
        },
        {
            name: "IDX_ESTADO",
            columns: ["estado"],
        },
    ],
});

export default PedidoSchema;