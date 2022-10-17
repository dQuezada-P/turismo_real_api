//? Variables
import {Router} from 'express'
import { get } from 'http';
import oracledb from 'oracledb'
import {conectBD, connectdb} from '../config/config.js'
import { getTransports } from '../controllers/transport.controller.js';
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
router.get("/all",getTransports);

export default router
