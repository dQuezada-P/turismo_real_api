import jwt from "jsonwebtoken";

import { API_SECRET_KEY } from "../config/credentials.js";
import User from "../models/usersModel.js";




export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const { login } = req.body;
    console.log(req.headers)
    console.log(req.body)
    // console.log(req)
  
    if (!token) return res.status(403).json({ message: "No se ha enviado un Token", auth: false});
  
    try {
        return jwt.verify(token, API_SECRET_KEY, async (err, decoded) => { 
            if (err?.name == "TokenExpiredError") return res.status(403).json({ message: "Token ha expirado. Inicie sesión nuevamente" , auth: false });

            const { rut, correo } = decoded

            console.log(rut, correo)
        
            req.query.rut = rut

            const userModel = new User()
            const user = await userModel.getUser(rut, correo);
            
            if (!user) return res.status(404).json({ message: "Usuario no encontrado" , auth: false });

            if(login) {
                res.json({
                    user,
                    auth: true
                });
                return;
            }
            
            next();
        });
        
    } catch (error) {
        console.log('error')
        console.log(error)
        return res.status(401).json({ message: "Acceso no permitido" });
    }
};