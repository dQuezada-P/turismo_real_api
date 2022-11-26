import { API_SECRET_KEY } from "../config/credentials.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { emailConfirmAccount } from "../utils/email.js";

export const getUsersNew = async (req, res) => {
  try {
    const { type_user } = req.query;
    let usersList;
    if (type_user == "all") {
      usersList = await new User().getUsers();
    } else if (type_user == "client") {
      usersList = await new User().getClients();
    } else if (type_user == "employee") {
      usersList = await new User().getEmployees();
    } else {
      res.status(400).json({ msg: "No se entregó el tipo de usuario" });
    }

    res.json(usersList);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    console.log(req.query);
    const { rut, correo } = req.query;
    const user = await new User().getUser(rut, correo);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (req, res) => {
  const {
    rut,
    nombre,
    apellido,
    correo,
    direccion,
    telefono,
    password,
    id_rol,
  } = JSON.parse(req.body.content);
  console.log(JSON.parse(req.body.content));
  console.log(req.files);
  const newUser = new User(
    rut,
    nombre,
    apellido,
    req.files,
    correo,
    null,
    direccion,
    telefono,
    null,
    id_rol
  );
  newUser.pass = await newUser.encryptPassword(password);

  const response = await newUser.addUser();

  console.log(response)
  const token = jwt.sign(
    { id : response.r },
    API_SECRET_KEY,
    {}
  );

  emailConfirmAccount({token,nombre,apellido,correo})
  res.json(response);
};

export const editUser = async (req, res) => {
  console.log(req.body);
  const {
    rut,
    nombre,
    apellido,
    correo,
    estado,
    direccion,
    telefono,
    password,
  } = req.body;

  const newUser = new User(
    rut,
    nombre,
    apellido,
    "imagen",
    correo,
    estado,
    direccion,
    telefono,
    null,
    null
  );

  const response = await newUser.editUser();
  res.json(response);
};

export const deleteUser = async (req, res) => {
  try {
    const { rut } = req.params;
    const user = await new User().deleteUser(rut);
    console.log(rut);
    if (user == 0) res.json({ msg: "Usuario no existe" });
    res.json(user);
  } catch (error) {}
};
