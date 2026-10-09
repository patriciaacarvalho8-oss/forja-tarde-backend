import { Request, Response, NextFunction, response } from "express";

export function isAdmin(
    request: Request,
    Response: Response,
    next: NextFunction,
) {
    if (request.body.user.cargo === "ADMIN") {
        next();
    } else {
        return response.status(403).json("Acesso negado");
    }
}

export function isAdminOrHimself(
    request: Request,
    Response: Response,
    next: NextFunction,
) {
    if (request.body.user.cargo === "ADMIN" ||
        request.body.user.id === +request.params.id
    ) {
      next();
    } else {
        return response.status(403).json("Acesso negado");
    }
}