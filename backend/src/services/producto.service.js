"use strict";
import Producto from "../entity/producto.entity.js";
import { AppDataSource } from "../config/configDb.js";


//Revisar como estan las ids de todos
//Esta funcion busca un solo producto en la 
//lista,usando el id del producto o su nombre
export async function getProductoService(query) {
    try {
        const { id  } = query;

        const productoRepository = AppDataSource.getRepository(Producto)

        const productoFound = await productoRepository.findOne(
            {
                where: [{ id: id }],
            }
        );
        if (!productoFound) return [null, "Producto no encontrado"]
        return [productoFound, null];

    } catch (error) {
        console.error("Error al obtener el producto", error);
        return [null, "Error interno del servidor"];
    }
}


//Esta funcion busca todos los  productos en la lista
export async function getProductosService() {
    try {

        const productoRepository = AppDataSource.getRepository(Producto);

        const productos = await productoRepository.find();

        if (!productos || productos.length === 0)
            return [null, "No hay productos registrados"];
        return [productos, null];

    } catch (error) {
        console.error("Error al obtener los productos:", error);
        return [null, "Error interno del servidor"];
    }
}

//Esta funcion busca actualizar un producto en especifico
//creo que aca deberia estar la validacion para el rol no estoy seguro
export async function updateProductoService(query, body) {
    try {
        const { id } = query;

        const productoRepository = AppDataSource.getRepository(Producto)

        const productoFound = await productoRepository.findOne({
            where: [{ id: id }],
        });

        if (!productoFound)
            return [null, "Producto no encontrado"];

        const existingProducto = await productoRepository.findOne({
            where: [{ nombre: body.nombre }],
        });

        if (existingProducto && existingProducto.id !== productoFound.id) {
            return [null, "Ya existe un producto con el mismo nombre"];
        }

        const dataProductoUpdate = {
            nombre: body.nombre,
            valor: body.valor,
            stock: body.stock,
            categoria:body.categoria,
            updatedAt: new Date(),
        };
        await productoRepository.update({ id: id }, dataProductoUpdate);

        const productoData = await productoRepository.findOne({
            where: { id: id },
        });

        if (!productoData) {
            return [null, "Producto no encontrado despues de actualizar"];

        }

        return [productoData, null];
    } catch (error) {
        console.error("Error al modificar el producto:", error);
        return [null, "Error interno del servidor"];
    }

}

export async function deleteProductoService(query) {
    try {
        const { id } = query;
        const productoRepository = AppDataSource.getRepository(Producto)
        const productoFound = await productoRepository.findOne(
            {
                where: [{ id: id }],
            }
        );
        if (!productoFound)
            return [null, "Producto no encontrado"];

        const productoDeleted = await productoRepository.remove(productoFound);

        return [productoDeleted, null];


    } catch (error) {
        console.error("Error al eliminar el producto", error);
        return [null, "Error interno del servidor"];
    }

}
export async function createProductoService(producto) {
    try {
        const productoRepository = AppDataSource.getRepository(Producto);

        const { nombre, valor, stock, categoria } = producto;

        const createErrorMessage = (DataInfo, message) => ({
            DataInfo,
            message
        })

        const existingNombre = await productoRepository.findOne({
            where: {
                nombre,
            },
        });

        if (existingNombre) return [null,createErrorMessage("Nombre","Nombre ya en uso")];

        const newProducto = productoRepository.create({
            nombre:nombre, 
            valor:valor, 
            stock:stock,
            categoria:categoria
        });

        await productoRepository.save(newProducto);

        const { ...dataProducto } = newProducto;

        return [dataProducto, null];
    } catch (error) {
        console.error("Error al crear el Producto", error);
        return [null, "Error interno del servidor"];
    }
}