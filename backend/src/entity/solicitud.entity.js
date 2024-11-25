"use strict";
import { EntitySchema } from "typeorm";

const SolicitudSchema = new EntitySchema({
    name: "Solicitud",
    tableName: "solicitudes",
    columns: {
        id_Pedido: {
            type: "int",
            primary: true,
        },
        id_Producto: {
            type: "int",
            primary: true,
        },
        estado: {
            type: "varchar",
            length: 50,

            nullable: false,

        },
        cantidad: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    relations : {
        id_Pedido: {
            target: "pedidos",
            type: "many-to-one",
            joinColumn: { name: "id_Pedido", referencedColumnName: "id" },
            onDelete: "CASCADE"
        },
        id_Producto: {
            target: "productos",
            type: "many-to-one",
            joinColumn: { name: "id_Producto", referencedColumnName: "id" },
        }
    },
    indices: [
        {
            name: "IDX_ID_PEDIDO",
            columns: ["id_Pedido"],
            unique: true,
        },
        {
            name: "IDX_FECHA_Sol",
            columns: ["createdAt"],
        },
        {
            name: "IDX_CANTIDAD",
            columns: ["cantidad"],
        },
        {
            name: "IDX_ID_PRODUCTO",
            columns: ["id_Producto"],
        },
    ],
});

export default SolicitudSchema;