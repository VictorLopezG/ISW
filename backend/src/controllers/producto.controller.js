"user strict";
import {
    deleteProductoService,
    getProductoService,
    getProductosService,
    updateProductoService,

} from "../services/producto.service.js";
/*Recoradar añadir la funcino para agergar un prodcuto*/ 
/*Por ahora voy a omitir validaciones*/
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
        const { id, nombre, cantidad } = req.params;
        const { body } = req;
        /*
        Despues hago la validacion
        const { error: queryError } = userQueryValidation.validate({
            id,
            nombre,
            cantidad,
        });

        
        
        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }

        

        const { error: bodyError } = userBodyValidation.validate(body);

        if (bodyError)
            return handleErrorClient(
                res,
                400,
                "Error de validación en los datos enviados",
                bodyError.message,
            );

        */

        const [producto, errorproducto] = await updateProductoService({ id, nombre, cantidad }, body);

        if (errorproducto) return handleErrorClient(res, 400, "Error modificando al usuario", errorproducto);

        handleSuccess(res, 200, "Usuario modificado correctamente", producto);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteproducto(req, res) {
    try {
        const { id, nombre } = req.params;
        /* Despues hago sus validaciones quiero probar si funcionan 
        const { error: queryError } = userQueryValidation.validate({
            rut,
            id,
            email,
        });

        if (queryError) {
            return handleErrorClient(
                res,
                400,
                "Error de validación en la consulta",
                queryError.message,
            );
        }
        */

        const [ProductoDelete, errorProdDeleted] = await deleteProductoService({
            id,
            nombre,
        });

        if (errorProdDeleted) return handleErrorClient(res, 404, "Error eliminando el producto", errorProdDeleted);

        handleSuccess(res, 200, "Usuario eliminado correctamente", ProductoDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

