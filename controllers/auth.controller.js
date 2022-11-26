import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

import { authUser } from "../dao/auth.dao.js";
import { API_SECRET_KEY } from "../config/credentials.js";

export const loginHandler = async (req, res) => {
    try {
        const { username, password, remember } = req.body;
        console.log(req.body)

        // VALIDAR QUE EL USUARIO EXISTA
        const { userRes, msg, error } = await authUser(username)
        if (error){
            res.status(400).json({error});
            return;
        }
        console.log('Mensaje de la bd: ', msg)
        if ( userRes === undefined ) 
        {
            res.status(400).json({
                auth: false,
                message: "Usuario o Contraseña inválida. Porfavor intente nuevamente."
            });
            return;
        }

        if (userRes.ESTADO == 0){
            res.status(400).json({
                auth: false,
                message: "Usuario no ha sido verificado mediante correo electrónico."
            });
            return;
        }
        const userModel = new User();
        
        const matchPassword = await userModel.comparePassword(password, userRes.PASS)
        delete userRes.PASS
        
        if (!matchPassword)
        {
            console.log('hola')
            res.status(400).json({
                auth: false,
                message: "Usuario o Contraseña inválida. Porfavor intente nuevamente."
            });
            return;
        }

        const options = {} 
        if (!remember) options.expiresIn = 86400 // 24 hours
        console.log(options)
        const token = jwt.sign(
            { rut: userRes.RUT, correo: userRes.CORREO }, 
            API_SECRET_KEY, 
            options
        ); 
        
        console.log({
            auth: true,
            token,
            user: userRes
        })

        res.json({
            auth: true,
            token,
            user: userRes
        })
    } catch (error) {
        res.json({error})
    }
}

export const confirmAccount = async (req, res) => {
    try {
        const { token } = req.body;
        console.log(req.body)
        return jwt.verify(token, API_SECRET_KEY, async (err, decoded) => { 
            console.log(err)
            if (err?.name == "TokenExpiredError") return res.status(403).json({ msg: "La solicitud ha expirado. ¿Deseas enviar una nueva a tu correo?" , r: 0 });

            const { id } = decoded

            const userModel = new User()
            const {r,msg} = await userModel.validateUser(id);
            console.log(r,msg)
            if (!r) return res.status(404).json({ msg: "Usuario no encontrado" , r: 0 });
            
            res.json({
                r
            });
        });
    } catch (error) {
        
    }
}