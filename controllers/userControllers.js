import oracledb from "oracledb";

import { conectBD } from "../config/config.js";

import User from '../models/usersModel.js'

export const getUsers = async (req, res) => {
  try {
    const usersList = await new User().getUsers();
    res.json(usersList);
  } catch (error) {
    console.error(error);
  }
};

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


// router.post("/auth", async (req, res) => {
//   const { correo, password } =
//     req.body;
//   console.log(req.body)

//   binds = {
//     correo: correo,
//     cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
//   };
  
//   sql = `BEGIN ACCIONES_USUARIO.AUTH_USUARIO(  
//                                             :correo,
//                                             :cursor); 
//                                             END;`;

//   const callback = async (result) => {
//     const resultSet = result.outBinds.cursor
//     const rows = await resultSet.getRows()
//     await resultSet.close()
//     const json = jsonListGen(rows)
//     bcrypt.compare(password, json.hashedPass, function(err, result) {
//       console.error("error: ",err)
//       res.json(result)
//     });
//   };

//   const jsonListGen = (rows) => {
//     let json;

//     rows.map((row) => {
//       json = {
//         correo: row[0],
//         hashedPass: row[1]
//       };
//     });
//     console.log(json);
//     return json;
//   };
//   await Open(sql, binds, { isAutoCommit: true }, callback);
// });