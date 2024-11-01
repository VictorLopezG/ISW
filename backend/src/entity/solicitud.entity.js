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
        cantidad: {
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
        // Relacion mesa-pedido
    },
    //clave foranea
    relations : {
        id_Pedido: {
            target: "pedidos",
            type: "many-to-one",
            joinColumn: { name: "id_Pedido", referencedColumnName: "id" },
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