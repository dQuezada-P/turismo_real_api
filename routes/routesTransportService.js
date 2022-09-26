//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD} from '../config/config.js'
// const { Router } = require("express");
// const oracledb = require("oracledb");
const router = Router();
// const db = require("../config/config.js");
//!ARREGLARRRRRRRRRRRRRRRRRRRRRRR!
//? Verbos HTTP

//*POST
router.post("/", async (req, res) => {
  const { ciudad, vehiculo, horario, conductor, precio } = req.body;
  binds = {
    ciudad: ciudad,
    vehiculo: vehiculo,
    horario: horario,
    conductor: conductor,
    precio: precio,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TRANSPORTE.CREAR_TRANSPORTE(:ciudad,
                                                    :vehiculo,
                                                    :horario,
                                                    :conductor,
                                                    :precio,
                                                    :resultado);
                                                    END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});
//*PUT
router.put("/", async (req, res) => {
  const { id, ciudad, vehiculo, horario, conductor, precio } = req.body;
  binds = {
    id: id,
    ciudad: ciudad,
    vehiculo: vehiculo,
    horario: horario,
    conductor: conductor,
    precio: precio,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TRANSPORTE.MODIFICAR_TRANSPORTE(:id,
                                                    :ciudad,
                                                    :vehiculo,
                                                    :horario,
                                                    :conductor,
                                                    :precio,
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
  sql = `BEGIN ACCIONES_TRANSPORTE.ELIMINAR_TRANSPORTE(:id,:resultado);END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});

//*GET
router.get("/", async (req, res) => {
  binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TRANSPORTE.VER_TRANSPORTE(:cursor);END;`;

  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(jsonListGen(rows));
  };
  const jsonListGen = (rows) => {
    console.log(rows);

    const json = [];

    rows.map((row) => {
      json.push({
        id: row[0],
        ciudad: row[1],
        vehiculo: row[2],
        horario: row[3],
        conductor: row[4],
        precio: row[5],
      });
    });

    return json;
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});

export default router
