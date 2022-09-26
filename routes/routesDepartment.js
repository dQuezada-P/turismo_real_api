import { Router } from "express";
import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/departmentControllers.js";

const router = Router();

router.get("/all", getDepartments);
router.get("/", getDepartment);
router.post("/", addDepartment);
router.put("/", editDepartment);
router.delete("/", deleteDepartment);
// router.get("/all", async (req, res) => {
//   const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTO(:cursor); END;`;

//   const binds = {
//     cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
//   };

//   const callback = async (result) => {
//     const resultSet = result.outBinds.cursor;
//     const rows = await resultSet.getRows();
//     await resultSet.close();
//     res.json(rows);
//   };

//   const options = {
//     outFormat: oracledb.OUT_FORMAT_OBJECT,
//     isAutoCommit: false,
//   };
//   await Open(sql, binds, options, callback);
// });

// router.get("/", async (req, res) => {
//   const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTO(:id,:cursor); END;`;

//   const binds = {
//     id: req.query.id,
//     cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
//   };

//   console.log(req.query.id);

//   const callback = async (result) => {
//     const resultSet = result.outBinds.cursor;
//     const rows = await resultSet.getRows();
//     await resultSet.close();
//     const [departemnt] = rows;
//     res.json(departemnt);
//   };
//   const options = {
//     outFormat: oracledb.OUT_FORMAT_OBJECT,
//     isAutoCommit: false,
//   };

//   await Open(sql, binds, options, callback);
// });

//* POST
// router.post("/", async (req, res) => {
//   const {
//     nombre,
//     numero_banno,
//     numero_habitacion,
//     direccion,
//     valor_arriendo,
//     localidad,
//     descripcion,
//   } = req.body;
//   const dateNow = new Date();

//   const fecha = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;

//   const binds = {
//     nombre: nombre,
//     numero_banno: parseInt(numero_banno, 10),
//     numero_habitacion: parseInt(numero_habitacion, 10),
//     fecha: fecha,
//     direccion: direccion,
//     valor_arriendo: parseInt(valor_arriendo, 10),
//     id_localidad: parseInt(localidad, 10),
//     descripcion: descripcion,
//     r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
//     msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
//   };
//   console.log(binds);

//   const sql = `BEGIN ACCIONES_DEPARTAMENTO.CREAR_DEPARTAMENTO(
//                                                               :nombre,
//                                                               :numero_banno,
//                                                               :numero_habitacion,
//                                                               :fecha,
//                                                               :direccion,
//                                                               :valor_arriendo,
//                                                               :id_localidad,
//                                                               :descripcion,
//                                                               :r,
//                                                               :msg);
//               END;`;

//   const callback = (result) => {
//     console.log(result);
//     res.json(result);
//   };
//   await Open(sql, binds, { isAutoCommit: true }, callback);
// });

//* PUT

// router.put("/", async (req, res) => {
//   const {
//     nombre,
//     numero_banno,
//     numero_habitacion,
//     direccion,
//     valor_arriendo,
//     id_localidad,
//     descripcion,
//   } = req.body;

//   const sql = `BEGIN ACCIONES_DEPARTAMENTO.MODIFICAR_DEPARTAMENTO(
//                                                               :id
//                                                               :nombre,
//                                                               :numero_banno,
//                                                               :numero_habitacion,
//                                                               :fecha,
//                                                               :direccion,
//                                                               :valor_arriendo,
//                                                               :id_localidad,
//                                                               :descripcion,
//                                                               :r); 
//               END;`;

//   const dateNow = Date.now();
//   const fecha = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;
//   const binds = {
//     nombre: nombre,
//     numero_banno: numero_banno,
//     numero_Habitacion: numero_habitacion,
//     fecha: fecha,
//     direccion: direccion,
//     valor_arriendo: valor_arriendo,
//     id_localidad: id_localidad,
//     descripcion: descripcion,
//     r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
//   };
//   const callback = (result) => {
//     res.json(result);
//   };
//   await Open(sql, binds, { isAutoCommit: true }, callback);
// });

//* DELETE

// router.delete("/", async (req, res) => {
//   const { id } = req.body;
//   const sql = `BEGIN ACCIONES_DEPARTAMENTO.ELIMINAR_DEPARTAMENTO(:id,:r); END;`;
//   const binds = {
//     id: id,
//     r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
//   };
//   const callback = (result) => {
//     res.json(result);
//   };
//   await Open(sql, binds, { isAutoCommit: true }, callback);
// });

 export default router;
