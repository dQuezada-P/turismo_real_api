import { conectBD } from "../config/config.js";
import oracledb from "oracledb";

export const getDepartments = async (req, res) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTOS(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  const departments = await conectBD(sql, binds, options);
  res.json(departments);
};

export const getDepartment = async (req, res) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTO(:id,:cursor); END;`;
  const binds = {
    id: req.query.id,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  const [department] = await conectBD(sql, binds, options);
  console.log(department)
  res.json(department);
};

export const addDepartment = async (req, res) => {const {
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    valor_arriendo,
    localidad,
    descripcion,
  } = JSON.parse(req.body.content);
  
  console.log(valor_arriendo)
  const valor = valor_arriendo.toString().replace('$','').replace(',','')
  console.log(valor)
  
  const dateNow = new Date();
  const fecha = `${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;

  const binds = {
    nombre: nombre,
    numero_banno: parseInt(numero_banno, 10),
    numero_habitacion: parseInt(numero_habitacion, 10),
    fecha: fecha,
    direccion: direccion,
    valor_arriendo: parseInt(valor, 10),
    id_localidad: parseInt(localidad, 10),
    descripcion: descripcion,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.CREAR_DEPARTAMENTO(:nombre,
                                                              :numero_banno,
                                                              :numero_habitacion,
                                                              :fecha,
                                                              :direccion,
                                                              :valor_arriendo,
                                                              :id_localidad,
                                                              :descripcion,
                                                              :r,
                                                              :msg);
                                                              END;`;

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };
  const department = await conectBD(sql, binds, options, false);

  res.json(department);
};
export const editDepartment = async (req, res) => {
  const {
    id,
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    valor_arriendo,
    id_localidad,
    descripcion,
  } = req.body;
  const dateNow = new Date();
  const fecha =`${dateNow.getDate()}/${dateNow.getMonth()}/${dateNow.getFullYear()}`;
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.MODIFICAR_DEPARTAMENTO(
                                                              :id,
                                                              :nombre,
                                                              :numero_banno,
                                                              :numero_habitacion,
                                                              :fecha,
                                                              :direccion,
                                                              :valor_arriendo,
                                                              :id_localidad,
                                                              :descripcion,
                                                              :r,
                                                              :msg);
                                                              END;`;

  const binds = {
    id,
    nombre: nombre,
    numero_banno: numero_banno,
    numero_Habitacion: numero_habitacion,
    fecha: fecha,
    direccion: direccion,
    valor_arriendo: valor_arriendo,
    id_localidad: id_localidad,
    descripcion: descripcion,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };
  const department = await conectBD(sql, binds, options, false);

  res.json(department);
};
export const deleteDepartment = async (req, res) => {
  const { id } = req.body;
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.ELIMINAR_DEPARTAMENTO(:id,:r,:msg); END;`;
  const binds = {
    id: id,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };
  const department = await conectBD(sql, binds, options, false);

  res.json(department);
};

// "id": 6,
//   "nombre": "DEPTO BASICO 2",
//   "numero_banno": 5,
//   "numero_Habitacion": 5,
//   "fecha": "25/8/2022",
//   "direccion": "SU CASA",
//   "valor_arriendo": 10000,
//   "id_localidad": 3,
//   "descripcion": "TURISTAS",
//   "r": {
//     "type": 2010,
//     "dir": 3003
//   },
//   "msg": {
//     "type": 2001,
//     "dir": 3003
//   }
