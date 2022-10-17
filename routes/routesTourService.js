//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD, connectdb} from '../config/config.js'
import { getTours } from '../controllers/tour.controller.js';
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
router.get("/all", getTours);

export default router
