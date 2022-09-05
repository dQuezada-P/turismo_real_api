//? Variables
const { Router } = require("express");
const oracledb = require("oracledb");
const router = Router();
const db = require("../config/config.js");

//? Verbos HTTP

//*POST
router.post("/", async (req, res) => {
  const { id, fecha_contrato, descripcion, id_transporte, id_tour } = req.body;
  sql = ` BEGIN ACCIONES_SERVICIO.CREAR_SERVICIO( :id,
                                                  :fecha_contrato,
                                                  :descripcion,
                                                  :id_transporte,
                                                  :id_tour,
                                                  :resultado);
                                                END;`;
  binds = {
    id: id,
    fecha_contrato: fecha_contrato,
    descripcion: descripcion,
    id_transporte: id_transporte,
    id_tour: id_tour,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});
//*PUT
router.put("/", async (req, res) => {
  const { id, fecha_contrato, descripcion, id_transporte, id_tour } = req.body;
  sql = ` BEGIN ACCIONES_SERVICIO.MODIFICAR_SERVICIO( :id,
                                                      :fecha_contrato,
                                                      :descripcion,
                                                      :id_transporte,
                                                      :id_tour,
                                                      :resultado);
                                                    END;`;
  binds = {
    id: id,
    fecha_contrato: fecha_contrato,
    descripcion: descripcion,
    id_transporte: id_transporte,
    id_tour: id_tour,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});
//*DELETE
router.delete("/", async (req, res) => {
  const { id } = req.body;
  sql = ` BEGIN ACCIONES_SERVICIO.ELIMINAR_SERVICIO(:id,:resultado); END;`;
  binds = {
    id: id,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
});
//*GET
router.get("/", async (req, res) => {
  sql = ` BEGIN ACCIONES_SERVICIO.VER_SERVICIO(:cursor); END;`;
  binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const callback = async (result) => {
    const resultSet = result.outBinds.cursor;
    rows = await resultSet.getRows();
    await resultSet.close();
    res.json(rows);
  };
  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});

module.exports = router;
