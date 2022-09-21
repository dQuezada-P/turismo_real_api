//? Variables
const { Router } = require("express");
const oracledb = require("oracledb");
const router = Router();
const db = require("../config/config.js");

//? Verbos HTTP

//*POST
router.post("/", async (req, res) => {
  const {
    id,
    nombre,
    cantidad,
    estado,
    descripcion,
    id_producto,
    id_departamento,
  } = req.body;
  sql = ` BEGIN ACCIONES_INVENTARIO.CREAR_INVENTARIO(
                                                      :id,
                                                      :nombre,
                                                      :cantidad,
                                                      :estado,
                                                      :descripcion,
                                                      :id_producto,
                                                      :id_departamento,
                                                      :resultado); 
          END; `;
  binds = {
    id: id,
    nombre: nombre,
    cantidad: cantidad,
    estado: estado,
    descripcion: descripcion,
    id_producto: id_producto,
    id_departamento: id_departamento,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  callback = (result) => {
    res.json(result);
  };
  await db.Open(sql, binds, { isAutoCommit: true }, callback);
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
    console.log(rows)
    await resultSet.close();
    res.json(jsonListGen(rows))
  };

  const jsonListGen = (rows) => {
    let json

    rows.map((row)=>{
      json = { 
        rut : row[0], 
        nombre : row[1],
        apellido : row[2],
        correo : row[3],
        estado : row[4],
        direccion : row[5],
        telefono : row[6]
      }
    })
    console.log(json)
    return json
  }

  await db.Open(sql, binds, { isAutoCommit: false }, callback);
});

//*PUT
router.put("/", async (req, res) => {
  const {
    id,
    nombre,
    cantidad,
    estado,
    descripcion,
    id_producto,
    id_departamento,
  } = req.body;
  sql = ` BEGIN ACCIONES_INVENTARIO.MODIFICAR_INVENTARIO(
                                                    :id,
                                                    :nombre,
                                                    :cantidad,
                                                    :estado,
                                                    :descripcion,
                                                    :id_producto,
                                                    :id_departamento,
                                                    :resultado); 
                                                    END; `;
  binds = {
    id: id,
    nombre: nombre,
    cantidad: cantidad,
    estado: estado,
    descripcion: descripcion,
    id_producto: id_producto,
    id_departamento: id_departamento,
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
  sql = ` BEGIN ACCIONES_INVENTARIO.ELIMINAR_INVENTARIO(:id, :resultado); END; `;
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
  sql = ` BEGIN ACCIONES_INVENTARIO.VER_INVENTARIO(:cursor); END;`;
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
