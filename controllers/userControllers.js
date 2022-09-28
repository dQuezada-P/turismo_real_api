import { conectBD } from "../config/config.js";
import oracledb from "oracledb";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIOS_CLIENTE(:cursor); END;`;
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };
    const users = await conectBD(sql, binds, options);
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIO_CLIENTE(:rut,:cursor); END;`;
    const binds = {
      rut: req.query.rut,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };
    const [user] = await conectBD(sql, binds, options);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (req, res) => {
  console.log(req.body)
  const { rut, nombre, apellido, correo, direccion, telefono, password } =
    JSON.parse(req.body.content);

  const salt = 10;
  const encryptedPass = await bcrypt.hash(password, salt);
  const sql = `BEGIN ACCIONES_USUARIO.CREAR_USUARIO(  
    :rut,
    :nombre,
    :apellido,
    :correo,
    :estado,
    :direccion,
    :telefono,
    :pass,
    :rol,
    :r,
    :msg );
    END;`;
  const binds = {
    rut,
    nombre,
    apellido,
    correo,
    estado: "A",
    direccion,
    telefono,
    pass: encryptedPass,
    rol: 3,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const options = {
    isAutoCommit: true,
  };

  const user = await conectBD(sql, binds, options, false);
  res.json(user);
};

export const editUser = async (req, res) => {
  const { rut, nombre, apellido, correo, direccion, telefono } = req.body;
  const binds = {
    rut,
    nombre,
    apellido,
    correo,
    direccion,
    telefono,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const sql = `BEGIN ACCIONES_USUARIO.MODIFICAR_USUARIO(  :rut,
                                                    :nombre,
                                                    :apellido,
                                                    :correo,
                                                    :direccion,
                                                    :telefono,
                                                    :r,
                                                    :msg );
                                                    END;`;
  const options = {
    isAutoCommit: true,
  };

  const user = await conectBD(sql, binds, options, false);
  res.json(user);
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

export const authUser = async (req, res) => {
  const { correo, password } =
    req.body;
  console.log(req.body)

  const binds = {
    correo: correo,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  
  const sql = `BEGIN ACCIONES_USUARIO.AUTH_USUARIO(  
                                            :correo,
                                            :cursor); 
                                            END;`;

  const [json] = await conectBD(sql, binds, { isAutoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT });                                          
  console.log(json)
  bcrypt.compare(password, json.PASS, function(err, result) {
    delete json.PASS
    const response = {
      auth: result
    }
    if (result) response.user = json
    res.json(response)
    
  });
    
}


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