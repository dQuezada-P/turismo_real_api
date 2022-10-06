import jwt from "jsonwebtoken";

import { API_SECRET_KEY } from "../config/credentials.js";
import User from "../models/usersModel.js";

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const { login } = req.body;
    console.log(req.headers)
    console.log(req.body)
    // console.log(req)
  
    if (!token) return res.status(403).json({ message: "No se ha enviado un Token" });
  
    try {
        const decoded = jwt.verify(token, API_SECRET_KEY);
        console.log(decoded)
        const { rut, correo } = decoded
        req.query.rut = rut

        const userModel = new User()
        const user = await userModel.getUser(rut, correo);
        
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        if(login) {
            res.json(user);
            return;
        }
        
        next();
    } catch (error) {
        console.log('error')
        console.log(error)
        return res.status(401).json({ message: "Acceso no permitido" });
    }
};