//const { dir } = require('console')

//? Variables
const { Router } = require("express");
const oracledb = require("oracledb");
const { parse } = require("path");
const internal = require("stream");
const { json } = require("stream/consumers");
const router = Router();
const db = require("../config/config.js");

// *Verbos HTTPS

// *GET
router.get("/all", async (req, res) => {
  const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIOS_CLIENTE(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(jsonListGen(rows));
    console.log(rows)
  };

  const jsonListGen = (rows) => {
    const json = [];
    rows.map((row) => {
      json.push({
        rut: row[0],
        nombre: row[1],
        apellido: row[2],
        correo: row[3],
        estado: row[4],
        direccion: row[5],
        telefono: row[6],
        pass: row[7],
        tipo_usuario: row[8],
      });
    });
    console.log(json);
    return json;
  };

  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});

router.get("/", async (req, res) => {
  const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIO_CLIENTE(:rut,:cursor); END;`;

  const binds = {
    rut: req.query.rut,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(jsonListGen(rows));
  };

  const jsonListGen = (rows) => {
    let json;

    rows.map((row) => {
      json = {
        id: row[0],
        nombre: row[1],
        numero_banno: row[2],
        numero_Habitacion: row[3],
        fecha: row[4],
        direccion: row[5],
        valor_arriendo: row[6],
        ubicacion: row[7],
        descripcion: row[8],
      };
    });
    console.log(json);
    return json;
  };

  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});

// *POST
router.post("/", async (req, res) => {
  const { rut, nombre, apellido, correo, direccion, telefono, password } =
    req.body;

  binds = {
    rut: rut,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    estado: "A",
    direccion: direccion,
    telefono: telefono,
    pass: password,
    rol: 3,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  console.log(req.body);
  sql = `BEGIN ACCIONES_USUARIO.CREAR_USUARIO(  :rut,
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

  const callback = (result) => {
    console.log(result);
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

// *PUT
router.put("/", async (req, res) => {
  console.log("b: \n", req.body)
  const {
    rut,
    nombre,
    apellido,
    correo,
    direccion,
    telefono
  } = req.body;

  binds = {
    rut: rut,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    direccion: direccion,
    telefono: telefono,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  sql = `BEGIN ACCIONES_USUARIO.MODIFICAR_USUARIO(  :rut,
                                                    :nombre,
                                                    :apellido,
                                                    :correo,
                                                    :direccion,
                                                    :telefono,
                                                    :r,
                                                    :msg ); 
                                                    END;`;

  const callback = (result) => {
    console.log(result);
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

// *DELETE
router.delete("/", async (req, res) => {
  const { rut } = req.body;
  let binds = {
    rut: rut,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };

  sql = `BEGIN ACCIONES_USUARIO.ELIMINAR_USUARIO(:rut,:r);END;`;

  const callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

module.exports = router;
