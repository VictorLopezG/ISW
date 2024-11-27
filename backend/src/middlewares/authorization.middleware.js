import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
handleErrorClient,
handleErrorServer,
} from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) {
try {
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOneBy({ email: req.user.email });

    if (!userFound) {
    return handleErrorClient(
        res,
        404,
        "Usuario no encontrado en la base de datos",
    );
    }

    const rolUser = userFound.rol;

    if (rolUser !== "administrador") {
        return handleErrorClient(
            res,
            403,
            "Error al acceder al recurso",
            "Se requiere un rol de administrador para realizar esta acción."
        );
    }
    next();
} catch (error) {
    handleErrorServer(
    res,
    500,
    error.message,
    );
}
}

export async function isCocinero(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(User);
    
        const userFound = await userRepository.findOneBy({ email: req.user.email });
    
        if (!userFound) {
        return handleErrorClient(
            res,
            404,
            "Usuario no encontrado en la base de datos",
        );
        }
    
        const rolUser = userFound.rol;
    
        if (rolUser !== "cocinero") {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de cocinero para realizar esta acción."
            );
        }
        next();
    } catch (error) {
        handleErrorServer(
        res,
        500,
        error.message,
        );
    }
}

export async function isCajero(req, res, next) {
        try {
            const userRepository = AppDataSource.getRepository(User);
        
            const userFound = await userRepository.findOneBy({ email: req.user.email });
        
            if (!userFound) {
            return handleErrorClient(
                res,
                404,
                "Usuario no encontrado en la base de datos",
            );
            }
        
            const rolUser = userFound.rol;
        
            if (rolUser !== "cajero") {
                return handleErrorClient(
                    res,
                    403,
                    "Error al acceder al recurso",
                    "Se requiere un rol de mesero o cajero para realizar esta acción."
                );
            }
            next();
        } catch (error) {
            handleErrorServer(
            res,
            500,
            error.message,
            );
        }
}

export async function isMesero(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(User);
    
        const userFound = await userRepository.findOneBy({ email: req.user.email });
    
        if (!userFound) {
        return handleErrorClient(
            res,
            404,
            "Usuario no encontrado en la base de datos",
        );
        }
    
        const rolUser = userFound.rol;
    
        if (rolUser !== "mesero") {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de mesero o cajero para realizar esta acción."
            );
        }
        next();
    } catch (error) {
        handleErrorServer(
        res,
        500,
        error.message,
        );
    }
}