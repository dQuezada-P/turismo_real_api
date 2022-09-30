import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";

import { authUser } from "../dao/authDao.js";
import { API_SECRET_KEY } from "../config/credentials.js";

export const loginHandler = async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;
        
        // const { correo } = req.body;

        const { userRes, msg } = await authUser(username)
        console.log('Mensaje de la bd: ', msg)
        if ( userRes === undefined ) 
            return res.status(400).json({ message: "Usuario o Contraseña inválida" });

        const userModel = new User();

        const matchPassword = await userModel.comparePassword(password, userRes.PASS)
        delete userRes.PASS

        if (!matchPassword)
            res.status(400).json({message: "Usuario o Contraseña inválida"});
        
        const token = jwt.sign(
            { rut: userRes.RUT, correo: userRes.CORREO }, 
            API_SECRET_KEY, 
            { expiresIn: 86400 } // 24 hours
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