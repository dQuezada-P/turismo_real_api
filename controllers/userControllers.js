import oracledb from "oracledb";

import { conectBD } from "../config/config.js";

import User from '../models/usersModel.js'

export const getUsers = async (req, res) => {
  try {
    const { id_rol } = req.query;
    const usersList = await new User().getUsers(id_rol);

    if (id_rol != 4) { res.json(usersList); return;}
    
    const drivers = await getDrivers(usersList);
    res.json(drivers);
    
  } catch (error) {
    console.error(error);
  }
};

const getDrivers = async (usersList) => {
  const { users, drivers } = usersList;
    drivers.forEach((driver, index) => {
      driver.CONDUCTOR = users[index];
    })

    console.log(drivers)
    return drivers;
}

export const getUser = async (req, res) => {
  try {
    console.log(req.query)
    const { rut, correo } = req.query;
    const user = await new User().getUser(rut, correo)
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (req, res) => {
  const { rut, nombre, apellido, correo, direccion, telefono, password } =
    req.body;

  const newUser = new User(rut, nombre, apellido, 'imagen', correo, 'A', direccion, telefono, null, 3);
  newUser.pass = await newUser.encryptPassword(password);

  const response = await newUser.addUser();
  res.json(response)
};

export const editUser = async (req, res) => {
  console.log(req.body)
  const { rut, nombre, apellido, correo, direccion, telefono, password } =
    req.body;
    

  const newUser = new User(rut, nombre, apellido, 'imagen', correo, 'A', direccion, telefono, null, null);

  const response = await newUser.editUser();
  res.json(response);
};

export const deleteUser = async(req, res) => {
  const { rut } = req.body;
  const binds = {
    rut: rut,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };

  const sql = `BEGIN ACCIONES_USUARIO.ELIMINAR_USUARIO(:rut,:r);END;`;

  const options = {
    isAutoCommit: true,
  };
  const user = await conectBD(sql, binds, options, false);
  res.json(user);
};
