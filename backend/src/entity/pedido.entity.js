"use strict";
import { EntitySchema } from "typeorm";

/*@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Location, location => location.schedules, { onDelete: 'CASCADE' })
  location: Location;

  @ManyToOne(() => Movie, movie => movie.schedules, { onDelete: 'CASCADE' })
  movie: Movie;
} */



const PedidoSchema = new EntitySchema({
    name: "Pedido",
    tableName: "pedidos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        descripcion: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        total: {
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
        mesaID: {
            type: "int",
            nullable: false,
        },
    },
    //clave foranea
    relations : {
        mesaID: {
            target: "mesas",
            type: "many-to-one",
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
            columns: ["createdAt"],
        },
        {
            name: "IDX_TOTAL",
            columns: ["total"],
        },
    ],
});

export default PedidoSchema;