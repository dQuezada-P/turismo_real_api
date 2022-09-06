//const { dir } = require('console')

//? Variables
const { Router } = require("express");
const oracledb = require("oracledb");
const { json } = require("stream/consumers");
const router = Router();
const db = require("../config/config.js");

// *Verbos HTTPS

// *POST
router.post("/", async (req, res) => {
  const {
    rut,
    nombre,
    apellido,
    correo,
    estado,
    direccion,
    telefono,
    pass,
    rol,
  } = req.body;

  binds = {
    rut: rut,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    estado: estado,
    direccion: direccion,
    telefono: telefono,
    pass: pass,
    rol: rol,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_USUARIO.CREAR_USUARIO(  :rut,
                                                :nombre,
                                                :apellido,
                                                :correo,
                                                :estado,
                                                :direccion,
                                                :telefono,
                                                :pass,
                                                :rol,
                                                :r ); 
                                                END;`;

  const callback = (result) => {
    
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

// *PUT
router.put("/", async (req, res) => {
  const {
    rut,
    nombre,
    apellido,
    correo,
    estado,
    direccion,
    telefono,
    pass,
    rol,
  } = req.body;

  binds = {
    rut: rut,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    estado: estado,
    direccion: direccion,
    telefono: telefono,
    pass: pass,
    rol: rol,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };

  sql = `BEGIN ACCIONES_USUARIO.MODIFICAR_USUARIO(  :rut,
                                                    :nombre,
                                                    :apellido,
                                                    :correo,
                                                    :estado,
                                                    :direccion,
                                                    :telefono,
                                                    :pass,
                                                    :rol,
                                                    :r ); 
                                                    END;`;

  const callback = (result) => {
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

// *GET
router.get("/", async (req, res) => {
  const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIO_CLIENTE(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(jsonListGen(rows))
  };

  const jsonListGen = (rows) => {
    console.log(rows)

    const json = []

    rows.map((row)=>{
      json.push({ 
        rut : row[0], 
        nombre : row[1],
        apellido : row[2],
        correo : row[3],
        estado : row[4],
        direccion : row[5],
        telefono : row[6],
        pass : row[7],
        tipo_usuario : row[8],
      })
    })

    return json
  }

  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});



module.exports = router;
