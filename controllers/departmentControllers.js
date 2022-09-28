import { conectBD } from "../config/config.js";
import oracledb from "oracledb";
import { DepartmentDao } from "../models/departmentDao.js";

export const getDepartments = async (req, res) => {
  const departmenDao = await new DepartmentDao().getDepartmentsBD();
  res.json(departmenDao);
};

export const getDepartment = async (req, res) => {
  const departmenDao = await new DepartmentDao().getDepartmentBD(req.query.id);

  res.json(departmenDao);
};

export const addDepartment = async (req, res) => {
  const {
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    valor_arriendo,
    localidad,
    descripcion,
    estado_disponible,
    estado_reserva
  } = JSON.parse(req.body.content); //? .content se define en la aplicación de escritorio
  console.log(JSON.parse(req.body.content))
  const department = new DepartmentDao(
    null,
    nombre,
    numero_banno,
    numero_habitacion,
    null,
    direccion,
    valor_arriendo.replace('$','').replace(',',''),
    localidad,
    descripcion,
    estado_disponible,
    estado_reserva,
    req.files
  );
  
  const responseAction = (r) => res.json(r);

  await department.addDepartmetBD(responseAction);
  
 
};
export const editDepartment = async (req, res) => {
  const {
    _id,
    _nombre,
    _numero_banno,
    _numero_habitacion,
    _direccion,
    _valor_arriendo,
    _id_localidad,
    _descripcion,
    _estado_disponible,
    _estado_reserva,
    imagen,
  } = req.body;

  const department = new DepartmentDao(
    _id,
    _nombre,
    _numero_banno,
    _numero_habitacion,
    null,
    _direccion,
    _valor_arriendo,
    _id_localidad,
    _descripcion,
    _estado_disponible,
    _estado_reserva,
    imagen
  );

  res.json(await department.editDepartmentBD());

};
export const deleteDepartment = async (req, res) => {
  const departmenDao = await new DepartmentDao().deleteDepartmentBD(
    req.body._id
  );
  res.json(departmenDao);
};
