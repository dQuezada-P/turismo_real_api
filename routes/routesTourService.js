//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD, connectdb} from '../config/config.js'
// const { Router } = require("express");
// const oracledb = require("oracledb");
const router = Router();
// const db = require("../config/config.js");

//!ARREGLARRRRRRRRRRRRRRRRRRRRRRR!

//? Verbos HTTP

//*POST
router.post("/", async (req, res) => {
  const { ciudad, cupo, precio, descripcion, horario } = req.body;
  const binds = {
    ciudad: ciudad,
    cupo: cupo,
    precio: precio,
    descripcion: descripcion,
    horario: horario,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  const sql = `BEGIN ACCIONES_TOUR.CREAR_TOUR(:ciudad,
                                        :cupo,
                                        :precio,
                                        :descripcion,
                                        :horario,
                                        :resultado);
                                        END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});
//*PUT
router.put("/", async (req, res) => {
  const { id, ciudad, cupo, precio, descripcion, horario } = req.body;
  binds = {
    id: id,
    ciudad: ciudad,
    cupo: cupo,
    precio: precio,
    descripcion: descripcion,
    horario: horario,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TOUR.MODIFICAR_TOUR(:id,
                                        :ciudad,
                                        :cupo,
                                        :precio,
                                        :descripcion,
                                        :horario,
                                        :resultado);
                                        END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});

//*DELETE
router.delete("/", async (req, res) => {
  const { id } = req.body;
  binds = {
    id: id,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TOUR.ELIMINAR_TOUR(:id,:resultado);END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});

//*GET
// router.get("/all", async (req, res) => {
//   const binds = {
//     cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
//   };
//   const sql = ``;

//   const callback = async (result) => {
//     const resultSet = result.outBinds.cursor;
//     const rows = await resultSet.getRows();
//     await resultSet.close();
//     res.json(jsonListGen(rows));
//   };
//   const jsonListGen = (rows) => {
//     console.log(rows);

//     const json = [];

//     rows.map((row) => {
//       json.push({
//         id: row[0],
//         ciudad: row[1],
//         cupo: row[2],
//         precio: row[3],
//         descripcion: row[4],
//         horario: row[5],
//       });
//     });

//     return json;
//   };
//   await conectBD(sql, binds, { isAutoCommit: true }, callback);
// });
router.get("/all", async (req, res) => {
  const sql = `BEGIN ACCIONES_TOUR.VER_TOUR(:cursor);END;`;
  
  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
  }

  const { cursor } = await connectdb(sql, binds, options);

  const tours = await cursor.getRows();
  console.log(tours)

  res.json(tours)
});

export default router
