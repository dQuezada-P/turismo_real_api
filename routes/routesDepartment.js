//const { dir } = require('console')

//? Variables
const { Router } = require("express");
const oracledb = require("oracledb");
const router = Router();
const db = require("../config/config.js");

//? verbos HTTP
//* GET
router.get("/all", async (req, res) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTOS(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(jsonListGen(rows));
  };

  const jsonListGen = (rows) => {
    const json = [];

    rows.map((row) => {
      json.push({
        id: row[0],
        nombre: row[1],
        numero_banno: row[2],
        numero_Habitacion: row[3],
        fecha: row[4],
        direccion: row[5],
        valor_arriendo: row[6],
        ubicacion: row[7],
        descripcion: row[8],
      });
    });

    console.log(json);

    return json;
  };

  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});

router.get("/", async (req, res) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTO(:id,:cursor); END;`;

  const binds = {
    id: req.query.id,
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

router.get("/", async (req, res) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTO(:id,:cursor); END;`;

  const binds = {
    id: req.query.id,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(jsonListGen(rows))
  };

  const jsonListGen = (rows) => {

    const json = []

    rows.map((row)=>{
      json.push({ 
        id : row[0], 
        nombre : row[1],
        numero_banno : row[2],
        numero_Habitacion : row[3],
        fecha : row[4],
        direccion : row[5],
        valor_arriendo : row[6],
        ubicacion : row[7],
        descripcion : row[8],
      })
    })
    
    console.log(json)
    
    return json
  }

  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});

//* POST
router.post("/", async (req, res) => {
  const {
    id,
    nombre,
    numero_banno,
    numero_Habitacion,
    fecha,
    direccion,
    valor_arriendo,
    id_localidad,
    descripcion,
  } = req.body;

  const binds = {
    id: id,
    nombre: nombre,
    numero_banno: numero_banno,
    numero_Habitacion: numero_Habitacion,
    fecha: fecha,
    direccion: direccion,
    valor_arriendo: valor_arriendo,
    id_localidad: id_localidad,
    descripcion: descripcion,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };

  const sql = `BEGIN ACCIONES_DEPARTAMENTO.CREAR_DEPARTAMENTO(:id,
                                                              :nombre,
                                                              :numero_banno,
                                                              :numero_Habitacion,
                                                              :fecha,:direccion,
                                                              :valor_arriendo,
                                                              :id_localidad,
                                                              :descripcion,
                                                              :r); 
              END;`;

  const callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

//* PUT

router.put("/", async (req, res) => {
  const {
    id,
    nombre,
    numero_banno,
    numero_Habitacion,
    fecha,
    direccion,
    valor_arriendo,
    id_localidad,
    descripcion,
  } = req.body;

  const sql = `BEGIN ACCIONES_DEPARTAMENTO.MODIFICAR_DEPARTAMENTO(:id,
                                                              :nombre,
                                                              :numero_banno,
                                                              :numero_Habitacion,
                                                              :fecha,:direccion,
                                                              :valor_arriendo,
                                                              :id_localidad,
                                                              :descripcion,
                                                              :r); 
              END;`;

  const binds = {
    id: id,
    nombre: nombre,
    numero_banno: numero_banno,
    numero_Habitacion: numero_Habitacion,
    fecha: fecha,
    direccion: direccion,
    valor_arriendo: valor_arriendo,
    id_localidad: id_localidad,
    descripcion: descripcion,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  const callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

//* DELETE

router.delete("/", async (req, res) => {
  const { id } = req.body;
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.ELIMINAR_DEPARTAMENTO(:id,:r); END;`;
  const binds = {
    id: id,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  const callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});

module.exports = router;
