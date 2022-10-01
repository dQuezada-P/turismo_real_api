import jwt from "jsonwebtoken";

import { API_SECRET_KEY } from "../config/credentials.js";
import User from "../models/usersModel.js";

export const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token)
  
    if (!token) return res.status(403).json({ message: "No se ha enviado un Token" });
  
    try {
        const decoded = jwt.verify(token, API_SECRET_KEY);
        console.log(decoded)
        const { rut, correo } = decoded
        req.query.rut = rut

        const userModel = new User()
        const user = await userModel.getUser(rut, correo);
        
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        
        next();
    } catch (error) {
        console.log('error')
        console.log(error)
        return res.status(401).json({ message: "Acceso no permitido" });
    }
};