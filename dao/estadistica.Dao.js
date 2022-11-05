import oracledb from "oracledb";
import { connectdb } from "../config/config.js";
import Estadistica from "../models/estadistica.Model.js";

export const getCantDepartments = async () => {
    const sql = `BEGIN ESTADISTICA.CANT_DEPTOS(:cant_deptos); END;`;
    const binds = {      
      cant_deptos: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { cant_deptos } = await connectdb(sql, binds, options);
        return cant_deptos;

    } 
    catch (error) {
      console.error(error);
      return false;
    }

  };

export const filtroDepartamento = async (fechas) => {
  const sql = `BEGIN ESTADISTICA.REPORTE_DEPARTAMENTO(
    :id_departamento,    
    :fecha1,
    :fecha2,
    :cursor); END;`;
  const binds = {
    id_departamento: fechas.id_departamento,
    fecha1: fechas.fecha1,
    fecha2: fechas.fecha2,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  try {
      const { cursor } = await connectdb(sql, binds, options);
      if ( cursor !== undefined ){
        const date = await cursor.getRows();
        console.log(date)
        return date;
      }

  } 
  catch (error) {
    console.error(error);
    return false;
  }

};

export const filtroLocalidad = async (fechas) => {
  const sql = `BEGIN ESTADISTICA.REPORTE_LOCALIDAD(
    :id_localidad,    
    :fecha1,
    :fecha2,
    :cursor); END;`;
  const binds = {
    id_localidad: fechas.id_localidad,
    fecha1: fechas.fecha1,
    fecha2: fechas.fecha2,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  try {
      const { cursor } = await connectdb(sql, binds, options);
      if ( cursor !== undefined ){
        const date = await cursor.getRows();
        console.log(date)
        return date;
      }

  } 
  catch (error) {
    console.error(error);
    return false;
  }

};

// export const anno = async (estadistica) => {
//   const sql = `BEGIN ESTADISTICA.ANNO(
//     :fecha,
//     :cursor); END;`;

//     const binds ={
//       fecha: estadistica.fecha,

//     }
// }