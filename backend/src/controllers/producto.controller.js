"user strict";
import {
    createProductoService,
    deleteProductoService,
    getProductoService,
    getProductosService,
    updateProductoService,
} from "../services/producto.service.js";

import { 
    productoBodyValidation,
    productoQueryValidation 
} from "../validations/producto.validation.js";

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getProducto(req, res) {
    try {
        const { id } = req.params;

        const [producto, errorproducto] = await getProductoService({ id });

        if (errorproducto) return handleErrorClient(res, 404, errorproducto);

        handleSuccess(res, 200, "Producto encontrado", producto);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProductos(req, res) {
    try {

        const [productos, errorproducto] = await getProductosService();

        if (errorproducto) return handleErrorClient(res, 404, errorproducto);

        productos.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Productos encontrados", productos);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateProducto(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;

        const [errorProductoFound] = await getProductoService({ id });

        if (!errorProductoFound) 
            return handleErrorClient(res, 404, "Producto no encontrado");

        const { error: bodyError } = productoBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message,
            );

        const [producto, errorproducto] = await updateProductoService({ id }, body);

        if (errorproducto) return handleErrorClient(res, 400, "Error modificando al usuario", errorproducto);

        handleSuccess(res, 200, "Usuario modificado correctamente", producto);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteproducto(req, res) {
    try {
        const { id } = req.params;

        //Por ahora el codigo solo valida con ID no se me ocurre como hacer 
        //para diferenciar el nombre y el postman esta funcinoando con el id

        const { error: queryError } = productoQueryValidation.validate({
            id
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }
        

        const [ProductoDelete, errorProdDeleted] = await deleteProductoService({
            id
        });

        if (errorProdDeleted) return handleErrorClient(res, 404, "Error eliminando el producto", errorProdDeleted);

        handleSuccess(res, 200, "Usuario eliminado correctamente", ProductoDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createProducto(req,res) {
    try{
        const { body } = req;

        const { error } = productoBodyValidation.validate(body);

        if(error)
            return handleErrorClient(res,400,"Error de validacion",error.message);

        const [newProducto, errornewProducto] = await createProductoService(body);

        if(errornewProducto) 
            return handleErrorClient(res,400,errornewProducto);
        
        handleSuccess(res,201,"Producto creado con exito", newProducto);

    }catch(error){
        handleErrorServer(res, 500, error.message);
    }


    
}