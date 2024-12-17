"use strict";
import Producto from "../entity/producto.entity.js";
import { AppDataSource } from "../config/configDb.js";



export async function getProductoService(query) {
    try {
        const { id } = query;

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

export async function updateProductoService(query, body) {
    try {
        const { id } = query;

        const productoRepository = AppDataSource.getRepository(Producto)

        const categoriasvalidas = ["entrada", "bebestible", "postre", "ensalada", "plato de fondo"];

        const createErrorMessage = (DataInfo, message) => ({
            DataInfo,
            message
        })

        const productoFound = await productoRepository.findOne({
            where: [{ id: id }],
        });

        if (!productoFound)
        return [null,
        createErrorMessage("Producto no encontrado", "El Producto no ha sido encontrado")];

        const existingProducto = await productoRepository.findOne({
            where: [{ nombre: body.nombre }],
        });

        if (existingProducto && existingProducto.id !== productoFound.id) {
        return [null,
            createErrorMessage("Nombre", "Ya existe un producto con el mismo nombre")];
        }

        if (body.valor < 0 || body.valor > 1000000)
            return [null,
            createErrorMessage("Valor", "El valor debe de estar entre 0 y 1000000")];

        if ( body.stock < 0 ||  body.stock > 1000)
            return [null,
            createErrorMessage("Stock", "El stock debe de estar entre 0 y 1000")];


        if (!categoriasvalidas.includes(body.categoria))
            return [null,
            createErrorMessage("Categoria", "La categoria seleccionada no es valida")];

        const dataProductoUpdate = {
            nombre: body.nombre,
            valor: body.valor,
            stock: body.stock,
            categoria: body.categoria,
            updatedAt: new Date(),
        };
        await productoRepository.update({ id: id }, dataProductoUpdate);

        const productoData = await productoRepository.findOne({
            where: { id: id },
        });

        if (!productoData) {
            return [null, createErrorMessage("Producto no encontrado",
                "El Producto no ha sido encontrado despues de actualizar")];
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
        const createErrorMessage = (DataInfo, message) => ({
            DataInfo,
            message
        })
        const productoFound = await productoRepository.findOne(
            {
                where: [{ id: id }],
            }
        );
        if (!productoFound)
            return [null, createErrorMessage("Producto no encontrado", "El Producto no ha sido encontrado")];

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

        const categoriasvalidas = ["entrada", "bebestible", "postre", "ensalada", "plato de fondo"];

        const createErrorMessage = (DataInfo, message) => ({
            DataInfo,
            message
        })

        const existingNombre = await productoRepository.findOne({
            where: {
                nombre,
            },
        });

        if (existingNombre)
            return [null, createErrorMessage("Nombre", "Nombre ya en uso")];

        if (valor < 0 || valor > 1000000)
            return [null, createErrorMessage("Valor", "El valor debe de estar entre 0 y 1000000")];

        if (stock < 0 || stock > 1000)
            return [null, createErrorMessage("Stock", "El stock debe de estar entre 0 y 1000")];

        if (!categoriasvalidas.includes(categoria))
            return [null, createErrorMessage("Categoria", "La categoria seleccionada no es valida")];

        const newProducto = productoRepository.create({
            nombre: nombre,
            valor: valor,
            stock: stock,
            categoria: categoria
        });

        await productoRepository.save(newProducto);

        const { ...dataProducto } = newProducto;

        return [dataProducto, null];
    } catch (error) {
        console.error("Error al crear el Producto", error);
        return [null, "Error interno del servidor"];
    }
}