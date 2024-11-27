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
async function checkRole(req, res, next, rolesToCheck) {
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
    
        const userRoles = Array.isArray(userFound.rol) ? userFound.rol : [userFound.rol];
    
        const hasRole = userRoles.some(role => rolesToCheck.includes(role));
    
        if (hasRole) {
            return next();
        }
    
        return res.status(401).json({
            message: "No tienes los permisos necesarios para realizar esta acción"
        });
    } catch (error) {
        return res.status(500).json({
            message: "authorization.middleware -> checkRole()",
            error: error.message,
        });
    }
    }
    export function authorizeRoles(...roles) {
        return (req, res, next) => {
            checkRole(req, res, next, roles);
        };
    }
